import React, { useEffect, useState } from "react";
import CHeckOutNav from "./CheckOutNav";
import { useNavigate, useLocation, NavLink, useParams } from "react-router-dom";
import { makeAnAPICall } from "../../UtilityFunctions/ProductListUtilityFuntion/APiCalls";
import { useLoginContext } from "../../Contexts/loginRegistrationContext/loginRegistrationContext";
import { useAddressContext } from "../../Contexts/AddressContext/AddressContext";
function UpdateAddress() {
  let navigate = useNavigate();
  const { state } = useLocation();
  const {
    state: { userInfo },
  } = useLoginContext();
  const { addressDispatch } = useAddressContext();

  const { id } = useParams();

  const url = () => {
    if (id == undefined) {
      return `http://localhost:5000/api/address`
    }
    else
      return `http://localhost:5000/api/address/${id}`
  }

  const [address, setAddress] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const data = await makeAnAPICall(
          "GET",
          `http://localhost:5000/api/address/${id}`,
          null,
          null,
          null,
          userInfo.token,
          null,
          null,
          null
        );
        setAddress({
          ...address,
          address: data.data.address,
          city: data.data.city,
          postalCode: data.data.postalCode,
          country: data.data.country,
        });
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  const adressHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await makeAnAPICall(
        "POST",
        url(),
        addressDispatch,
        "LOAD_ADDRESS",
        address,
        userInfo.token,
        null,
        null,
        null
      );
      console.log(data);
      navigate("/Address");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <CHeckOutNav step2 />
      <div className="shipping-address-container">
        <h2>Shipping</h2>
        <form onSubmit={(e) => adressHandler(e)}>
          <label htmlFor="">Address</label>
          <input
            type="text"
            placeholder="enter address"
            required
            value={address.address}
            onChange={(e) =>
              setAddress({ ...address, address: e.target.value })
            }
          />
          <label htmlFor="">City</label>
          <input
            type="text"
            placeholder="enter City"
            required
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
          />
          <label htmlFor="">Postal Code</label>
          <input
            type="number"
            placeholder="enter Postal Code"
            required
            value={address.postalCode}
            onChange={(e) =>
              setAddress({ ...address, postalCode: e.target.value })
            }
          />
          <label htmlFor="">Country</label>
          <input
            type="text"
            placeholder="enter Country"
            required
            value={address.country}
            onChange={(e) =>
              setAddress({ ...address, country: e.target.value })
            }
          />
          <button>{ id?"Update Address":"Add new Address"}</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateAddress;
