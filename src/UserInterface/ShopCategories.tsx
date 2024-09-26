import {
  CustomCard,
  CustomCardTitle,
  CustomCardBody,
} from "./ReusableComponents/CustomCard";

function ShopCategories() {
  return (
    <section className="space-y-5">
      <h2>Categories</h2>
      <div className="flex gap-5">
        <CustomCard cardColor="accent" size="small">
          <img
            src="https://photos5.appleinsider.com/price_guide/m2-macbook-air-15-inch-midnight-pp-header.png"
            alt="laptop"
          ></img>
          <CustomCardTitle>Laptops</CustomCardTitle>
          <CustomCardBody className="text-text-color-900">
            <p>Portable and powerful</p>
          </CustomCardBody>
        </CustomCard>
        <CustomCard cardColor="accent" size="small">
          <img
            src="https://www.omen.com/content/dam/sites/omen/worldwide/desktops/2022-desktop-home-2-0/21-c-2-articuno-45-l-blizzard-oc-liquid-cooled-gfx-3080-white-led-jack-black-non-odd-core-set-front-right@2x.png"
            alt="Dektop"
          ></img>
          <CustomCardTitle>Desktops</CustomCardTitle>
          <CustomCardBody className="text-text-color-900">
            <p>Powerhouse on your table</p>
          </CustomCardBody>
        </CustomCard>
      </div>
    </section>
  );
}

export default ShopCategories;
