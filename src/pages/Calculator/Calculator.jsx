import React, { useEffect, useState } from "react";
import Location from "./components/Location";
import { addToCard, getLocations, getProducts } from "../../services/calculator-service";
import { customDate, getNumberKey } from "../../utils/date";
import "./Calculator.scss";

// requirement (do not need to do ADD LOCATION), so i'm assigned location with id = 4

const Calculator = () => {
  const [ loading, setLoading ] = useState(false);
  const [ isSubmit, setIsSubmit ] = useState(false);
  const [ products, setProducts ] = useState([]);
  const [ locations, setLocations ] = useState([]);
  const [ date, setDate ] = useState("");
  const [ product, setProduct ] = useState("");
  const [ units, setUnits ] = useState(0);
  const [ price, setPrice ] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date || !product) {
      alert("Please choose product or date");
      return;
    }

    const params = {
      date: date,
      product: product,
      locations: {
        id: 4,
        quantity: units
      }
    };

    console.log("submit", params);

    try {
      setIsSubmit(true);
      const res = await addToCard(params);

      if (res && res.status === "success") {
        alert("Complete!");
      }

      console.log(res);
    } catch (errors) {
      console.log(errors);
    } finally {
      setIsSubmit(false);
    }
  };

  // Get date custom
  const { min, max } = customDate();

  const handleGetProducts = async () => {
    try {
      const res = await getProducts();
      console.log(res);
      setProducts(res);
    } catch (errors) {
      console.log(errors);
    } finally {
      console.log("finally");
    }
  };

  const handleGetLocations = async () => {
    try {
      setLoading(true);
      const res = await getLocations();
      console.log(res);
      setLocations(res);
    } catch (errors) {
      console.log(errors);
    } finally {
      setLoading(false);
    }
  };

  const handleProduct = ({ target }) => setProduct(target.value);

  const handleDate = ({ target }) => {
    if (!product) {
      alert("Please select product !");
      resetDate();
      return;
    }
    const numberKey = getNumberKey(target.value);

    if (numberKey && numberKey > 0) {
      const objMaxPro = products.filter((p) => p.id === product)[ 0 ];
      const units = handleMaxPro(objMaxPro.max_production, numberKey);
      console.log(units);
      handleLocationUnit(units, target.value);
      setPrice(objMaxPro.price_per_unit);
    }
  };

  // If the number of days in the future the user has picked is greater than the largest days key then use the largest key
  const handleMaxPro = (maxPro, key) => {
    if (!maxPro[ key ]) {
      const lastItem = Object.keys(maxPro)[ Object.keys(maxPro).length - 1 ];
      return maxPro[ lastItem ];
    }

    return maxPro[ key ];
  };

  // Also the total sum of all location units cannot be larger than the available production for that date and product
  const handleLocationUnit = (units, date) => {
    const maxDist = locations[ 3 ].max_dist;
    console.log(maxDist, "max_dist");

    if (units > maxDist) {
      alert("The location units cannot be larger than the locations Max Distribution value");
      resetDate();
      return;
    }

    setDate(date);
    setUnits(units);
  };

  const resetDate = () => setDate("");

  useEffect(() => {
    handleGetProducts();
    handleGetLocations();
  }, []);

  if (loading) return <div>loading...</div>;

  return (
    <main className="main">
      <header className="header">Calculator</header>
      <div className="cal-form">
        <form onSubmit={handleSubmit}>
          <div className="cal-form__field">
            <label>Product</label>
            <select name="product" onChange={handleProduct}>
              <option value="">choose</option>
              {products.map((p) => {
                return (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="cal-form__field">
            <label>Date</label>
            <input type="date" value={date} min={min} max={max} name="date" id="date" onChange={handleDate} />
          </div>
          <div className="cal-form__field">
            <Location place={locations[ 3 ]} units={units} cost={units * price} />
          </div>
          <div className="cal-form__field">
            <label>Total Units</label>
            <div>{units}</div>
          </div>
          <div className="cal-form__field">
            <label>Total Cost</label>
            <div>{units * price}</div>
          </div>

          {isSubmit ? (
            <div>Loading...</div>
          ) : (
            <button type="submit" className="btn">
              Submit
            </button>
          )}
        </form>
      </div>
    </main>
  );
};

export default Calculator;
