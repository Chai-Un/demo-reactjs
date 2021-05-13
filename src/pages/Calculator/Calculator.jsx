import React, { useEffect, useState } from "react";
import MapModal from "./components/MapModal/MapModal.jsx";
import { addToCard, getProducts } from "../../services/calculator-service";
import { customDate, getNumberKey, getDateToday } from "../../utils/date";
import { calculateUnit, calculateCost } from "../../utils/calculator";
import { IconButton, Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import "./Calculator.scss";

const Calculator = () => {
  const { min, max } = customDate();

  const [products, setProducts] = useState([]);
  const [locations, setLocations] = useState([]);
  const [listIdAdded, setListIdAdded] = useState([]);
  const [date, setDate] = useState(getDateToday());
  const [product, setProduct] = useState();
  const [open, setOpen] = useState(false);
  const [totalUnits, setTotalUnits] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [numberKey, setNumberKey] = useState(1);

  //submit to card
  const handleSubmit = async (e) => {
    e.preventDefault();
    let listLocationsCart = [];

    if (!date || !product || locations.length === 0) {
      alert("Please choose product , date or add location");
      return;
    }

    if (product["max_production"][numberKey.toString()] < totalUnits) {
      alert(
        `The total sum of all location units cannot be larger than ${
          product["max_production"][numberKey.toString()]
        } for that date and product`
      );
      return;
    }

    locations.forEach((e) => {
      listLocationsCart.push({
        id: e.id,
        quantity: e.unit
      });
    });

    const params = {
      date: date,
      product: product.id,
      locations: listLocationsCart
    };

    console.log("submit", params);

    try {
      await addToCard(params);
    } catch (errors) {
      console.log(errors);
      setLocations([]);
      setListIdAdded([]);
    } finally {
      alert("Complete!");
      setLocations([]);
      setListIdAdded([]);
    }
  };

  //get list products
  const handleGetProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res);
    } catch (errors) {
      console.log(errors);
    } finally {
    }
  };

  //get list locations added
  const handleGetLocations = (itemLocation) => {
    setLocations((locations) => [...locations, itemLocation]);
    setListIdAdded((listIdAdded) => [...listIdAdded, itemLocation.id]);
  };

  //delete location
  const handleDeleteLocation = (id) => () => {
    setLocations((locations) => locations.filter((e) => e.id !== id));
    setListIdAdded((listIdAdded) => listIdAdded.filter((e) => e !== id));
  };

  //change product select
  const handleChangeProduct = ({ target }) => {
    setProduct(JSON.parse(target.value));
  };

  //change date select
  const handleDate = ({ target }) => {
    if (!product) {
      alert("Please select product !");
      return;
    }
    setDate(target.value);
    let numberKeyResponse =
      getNumberKey(target.value) > Object.keys(product["max_production"]).length
        ? Object.keys(product["max_production"]).length
        : getNumberKey(target.value);
    setNumberKey(numberKeyResponse);
  };

  const showModalAddLocation = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const onCloseModalAddLocation = () => {
    setOpen(false);
  };

  //get price when change location unit
  const handleChangePrice = (valueUnit, idLocation) => {
    let oldLocation = [...locations];
    let index = oldLocation.findIndex((el) => el.id === idLocation);
    if (valueUnit > oldLocation[index].max_dist) {
      alert(`The location units cannot be larger than the max distribution value ${oldLocation[index].max_dist}`);
    } else {
      oldLocation[index].unit = valueUnit;
      oldLocation[index].price = (valueUnit * oldLocation[index].fee).toFixed(2);
      setLocations(oldLocation);
    }
  };

  useEffect(() => {
    handleGetProducts();
  }, []);

  useEffect(() => {
    const calculateTotalUnit = () => {
      setTotalUnits(calculateUnit(locations));
    };

    const calculateTotalCost = () => {
      setTotalCost(calculateCost(locations));
    };

    calculateTotalUnit();
    calculateTotalCost();
  }, [locations]);

  return (
    <main className="main">
      <MapModal
        open={open}
        onClose={onCloseModalAddLocation}
        handleGetLocations={handleGetLocations}
        listIdAdded={listIdAdded}
      />
      <header className="header">Calculator</header>
      <div className="cal-form">
        <form onSubmit={handleSubmit}>
          <div className="cal-form__field">
            <label className="cal-form--bold">Product</label>
            <select name="product" onChange={handleChangeProduct}>
              <option value="">Products</option>
              {products.map((p) => {
                return (
                  <option key={p.id} value={JSON.stringify(p)}>
                    {p.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="cal-form__field">
            <label className="cal-form--bold">Date</label>
            <input type="date" value={date} min={min} max={max} name="date" id="date" onChange={handleDate} />
          </div>
          <div className="cal-form__field cal-form--bold">
            <label>Locations</label>
            <div className="location">
              <div className="location-item">
                <label>Place</label>
              </div>
              <div className="location-item">
                <label>Units</label>
              </div>
              <div className="location-item">
                <label>Cost</label>
              </div>
              <div className="location-item">
                <Button onClick={showModalAddLocation} variant="contained" color="secondary">
                  Add
                </Button>
              </div>
            </div>
          </div>

          {locations.map((e) => (
            <div className="cal-form__field" key={e.id}>
              <label></label>
              <div className="location">
                <div className="location-item">
                  <label>{e.name}</label>
                </div>
                <div className="location-item">
                  <input
                    className="location-item__unit"
                    value={e.unit}
                    onChange={(event) => {
                      handleChangePrice(event.target.value, e.id);
                    }}
                  ></input>
                </div>
                <div className="location-item">
                  <label>{e.price}</label>
                </div>
                <div className="location-item">
                  <IconButton onClick={handleDeleteLocation(e.id)} className="button-delete">
                    <CloseIcon />
                  </IconButton>
                </div>
              </div>
            </div>
          ))}

          <div className="cal-form__field cal-form--bold">
            <label>Total Units</label>
            <div className="cal-form__total">{totalUnits}</div>
          </div>
          <div className="cal-form__field cal-form--bold">
            <label>Total Cost</label>
            <div className="cal-form__total">{totalCost}</div>
          </div>
          <Button type="submit" variant="contained" color="primary" className="btn">
            Submit
          </Button>
        </form>
      </div>
    </main>
  );
};

export default Calculator;
