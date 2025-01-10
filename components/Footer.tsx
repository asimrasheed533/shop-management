import Image from "next/image";
import React from "react";
import "@/style/footer.scss";
import Link from "next/link";
export default function Footer() {
  return (
    <>
      <div className="footer__container">
        <div className="footer__container__content">
          <div className="footer__container__logo">
            <Image src="/logoMe.png" alt="logo" width={100} height={100} />
          </div>
          <div className="footer__nav__links">
            <Link href="/" className="footer__nav__link__entry">
              About
            </Link>
            <Link href="/" className="footer__nav__link__entry">
              Order Food
            </Link>
            <Link href="/" className="footer__nav__link__entry">
              Careers Offers
            </Link>
            <Link href="/" className="footer__nav__link__entry">
              Contact
            </Link>
          </div>
          <div className="footer__info__text__card__warper">
            <div className="footer__info__text__card">
              <div className="footer__info__text__card__title">Information</div>
              <div className="footer__info__text__card__subtitle">
                62 Big Tree St, Livonia, New York 14487, USA <br />
                customer_support@example.com
              </div>
            </div>
            <div className="footer__info__text__card">
              <div className="footer__info__text__card__title">
                Contact & Order
              </div>
              <div className="footer__info__text__card__subtitle">
                Call Us To Order or Order Online
              </div>
              <div className="footer__info__text__card__num">910-344-7520</div>
              <button className="footer__order__button">
                Order Online Now
              </button>
            </div>
            <div className="footer__info__text__card">
              <div className="footer__info__text__card__title">
                Hour time open
              </div>
              <div className="footer__info__text__card__subtitle">
                Monday – Thursday: 8.00am – 21.00pm
              </div>
              <div className="footer__info__text__card__subtitle">
                Friday – Saturday : 9.00am – 22.00pm
              </div>
              <div className="footer__info__text__card__subtitle">
                Sunday: 8.00 – 23.00pm
              </div>
              <div className="footer__info__text__card__subtitle">
                Holiday: <span>Closed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
