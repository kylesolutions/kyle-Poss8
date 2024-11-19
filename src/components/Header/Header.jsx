import React from 'react'

function Header() {
  return (
    <><div className='container'>
      <div className='header-wrapper'>
        <div id="carousel-indicators-dot" class="carousel slide carousel-fade" data-bs-ride="carousel">
          <div class="carousel-indicators carousel-indicators-dot">
            <button type="button" data-bs-target="#carousel-indicators-dot" data-bs-slide-to="0" class="active"></button>
            <button type="button" data-bs-target="#carousel-indicators-dot" data-bs-slide-to="1"></button>
            <button type="button" data-bs-target="#carousel-indicators-dot" data-bs-slide-to="2"></button>
            <button type="button" data-bs-target="#carousel-indicators-dot" data-bs-slide-to="3"></button>
            <button type="button" data-bs-target="#carousel-indicators-dot" data-bs-slide-to="4"></button>
          </div>
          <div class="carousel-inner test">
            <div class="carousel-item active">
              <img class="d-block w-100" alt="image" src='/images/seafood-soup.webp' />
            </div>
            <div class="carousel-item">
              <img class="d-block w-100" alt="Coffee on a Table With Other Items" src="/images/foodiesfeed.com_bowl-of-ice-cream-with-chocolate.jpg" />
            </div>
            <div class="carousel-item">
              <img class="d-block w-100" alt="Book on the Grass" src="/images/foodiesfeed.com_juicy-cheeseburger.jpg" />
            </div>
            <div class="carousel-item">
              <img class="d-block w-100" alt="A Woman Works at a Desk With a Laptop an a Cup of Coffee" src="/images/foodiesfeed.com_pink-macarons.jpg" />
            </div>
            <div class="carousel-item">
              <img class="d-block w-100" alt="People by a Banquet Table Full With Foods" src="/images/foodiesfeed.com_pouring-honey-on-pancakes.jpg" />
            </div>
          </div>
          {/* <div className='col-lg-1 bg-white side-menu'>
                    <div className='row p-2'>
                        <div className='col-lg-12 bg-light mb-2 text-center rounded '>
                            <div className=''>
                                <i class="bi bi-house-fill fs-2 "></i>
                            </div>
                            <a className='home fs-5 '>HOME</a>
                        </div>
                        <div className='col-lg-12 bg-light mb-2 text-center'>
                            <div className=''>
                                <i class="bi bi-menu-button-wide fs-2"></i>
                            </div>
                            <a className='home fs-5 '>MENU</a>
                        </div>
                        <div className='col-lg-12 bg-light mb-2 text-center'>
                            <div className=''>
                                <i class="bi bi-border-all fs-2"></i>
                            </div>
                            <a className='home fs-5 '>TABLE</a>
                        </div>
                        <div className='col-lg-12 bg-light mb-2 text-center'>
                            <div className=''>
                                <i class="bi bi-gear fs-2"></i>
                            </div>
                            <a className='home fs-5 '>SETTINGS</a>
                        </div>
                        <div className='col-lg-12 bg-light mb-2 text-center'>
                            <div className=''>
                                <i class="bi bi-sliders fs-2"></i>
                            </div>
                            <a className='home fs-5 '>ABOUT</a>
                        </div>
                    </div>
                </div> */}
        </div>
        <div className='header-text'>
          <h2>
          </h2>
        </div>
      </div>
    </div>

    </>
  )
}

export default Header