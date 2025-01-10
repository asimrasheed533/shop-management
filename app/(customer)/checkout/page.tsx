import "@/style/home.scss";
export default function Checkout() {
  return (
    <>
      <div className="checkout__container">
        <div className="checkout__container__heading">Checkout</div>

        <form className="checkout__content__warper__from">
          <div className="checkout__input__warper__name__entry">
            <div className="checkout__input__label">Name</div>
            <input
              className="checkout__input__entry__name"
              type="text"
              placeholder="Name"
              required
            />
          </div>
          <div className="checkout__input__warper__name__entry">
            <div className="checkout__input__label">Email</div>
            <input
              className="checkout__input__entry__name"
              type="email"
              required
              placeholder="Email"
            />
          </div>
          <div className="checkout__input__warper__name__entry">
            <div className="checkout__input__label">Phone Number</div>
            <input
              className="checkout__input__entry__name"
              type="tel"
              required
              placeholder="Phone Number"
            />
          </div>
          <div className="checkout__input__warper__name__entry">
            <div className="checkout__input__label">Address</div>
            <input
              className="checkout__input__entry__name"
              type="text"
              required
              placeholder="Address"
            />
          </div>

          <button className="checkout__btn">Place Order</button>
        </form>
      </div>
    </>
  );
}
