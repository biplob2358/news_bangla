document.getElementById("item-found").style.display = "none";
document.getElementById("spinnerView").style.display = "none";
const loadAllCategories = async () => {
  try {
    const url = `https://openapi.programming-hero.com/api/news/categories`;

    const res = await fetch(url);
    const data = await res.json();
    setAllCategories(data.data.news_category);
  } catch (error) {
    alert("Some thing is worng");
  }
};

const setAllCategories = (categories) => {
  for (const category of categories) {
    const { category_name, category_id } = category;

    const categoriesContrainer = document.getElementById(
      "categories-container"
    );
    const categoryDiv = document.createElement("div");

    categoryDiv.classList.add("text-center");
    categoryDiv.innerHTML = `
      <button class=" hover:bg-sky-300 px-4 hover:px-4 rounded " onclick="loadAllNews('${category_id}')">${category_name.toUpperCase()}</button>
      `;
    categoriesContrainer.appendChild(categoryDiv);
  }
};

const loadAllNews = async (category_id) => {
  document.getElementById("spinnerView").style.display = "block";
  try {
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    const res = await fetch(url);
    const data = await res.json();
    setAllNews(data);
  } catch (error) {
    alert("Some thing is worng");
  }
};

const setAllNews = async (allNews) => {
  const { data } = allNews;

  document.getElementById("item-found").style.display = "block";
  const totalItems = data.length;
  const foundItems = document.getElementById("item-found");
  foundItems.innerHTML = `
   <h1>${totalItems} items found </h1>
  
  `;
  document.getElementById("spinnerView").style.display = "none";

  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  data.sort((a, b) => {
    return b.total_view - a.total_view;
  });
  data.forEach((news) => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("my-8");

    cardDiv.innerHTML = `
    
    <div class="card lg:card-side p-4  bg-base-100 shadow-xl">
            
              <img src="${news.thumbnail_url}" alt="Album" />
            

            <div class="card-body">
              <h2 class="card-title">${news.title}</h2>
              <p>${news.details.slice(0, 200)}...</p>
              
             




            <div class="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1  ">
                <div class="flex sm:mx-auto  items-center  ">
                    <div>
                        <img class="w-10 mr-4 rounded-full" src="${
                          news.author.img
                        }" alt="Album" />
                    </div>
                   <div>
                        <p class="font-bold">${
                          news.author.name
                            ? news.author.name
                            : "No data available"
                        }       </p>
                        <p>${
                          news.author.published_date
                            ? news.author.published_date
                            : "No data available"
                        }   </p>
                    </div>
                </div>
                <div class="flex  items-center content-center  gap-4">
                  <span class="text-2xl"> <i class="fa-solid fa-eye"></i></span>
                    <p class=" flex-initial text-2xl">${
                      news.total_view ? news.total_view : "No data available"
                    }</p>
                </div>
                <div class="   text-2xl flex items-center text-yellow-600 ">
                   <span><i class="fa-solid fa-star"></i></span>   
                   <span><i class="fa-solid fa-star"></i></span>   
                   <span><i class="fa-solid fa-star"></i></span>   
                   <span><i class="fa-solid fa-star"></i></span>   
                   
                   <span><i class="fa-regular fa-star-half-stroke"></i></span>

                </div>
                <div class="card-actions justify-end ">
               

                    <label onclick="newsDetails('${
                      news._id
                    }')" for="my-modal" class="btn btn-primary modal-button"><i class="fa-sharp fa-solid fa-arrow-right-long"></i></label>
              </div>
            </div>

              
            
          </div>
    `;
    cardContainer.appendChild(cardDiv);
  });
};

const newsDetails = async (newsId) => {
  const url = `https://openapi.programming-hero.com/api/news/${newsId}`;
  const res = await fetch(url);
  const data = await res.json();
  showPlyerModals(data.data);
};

const showPlyerModals = (data) => {
  data = data[0];

  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = `
  
  
  <img class="w-full mr-4 " src="${data.image_url}" alt="Album" />
  <h2 class="text-2xl font-bold">${data.title}</h2>
<p>${data.details ? data.details : "No data available"}</p>
<div class="">
<p><span class="font-semibold">Rating:</span>${data.rating.number}</p>
<img class="w-10 mr-4 rounded-full" src="${data.author.img}" alt="Album" />
<p class="mt-4 font-semibold">Author:${
    data.author.name ? data.author.name : "No data available"
  }</p>
<p class="mt-4 font-semibold">Published Date:${
    data.author.published_date
      ? data.author.published_date
      : "No data available"
  }</p>
  <p><span class="font-semibold">Total View:</span>${
    data.total_view ? data.total_view : "No data available"
  }</p>
</div>
  
  `;
};

function openBlog() {
  window.location = "blog.html";
}

loadAllCategories();
