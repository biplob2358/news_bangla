document.getElementById("item-found").style.display = "none";
const loadAllCategories = async () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;

  const res = await fetch(url);
  const data = await res.json();
  setAllCategories(data.data.news_category);
};

const setAllCategories = (categories) => {
  //   console.log(categories);
  for (const category of categories) {
    const { category_name, category_id } = category;

    // console.log(category.category_name);

    const categoriesContrainer = document.getElementById(
      "categories-container"
    );
    const categoryDiv = document.createElement("div");
    categoryDiv.classList.add("text-center");
    categoryDiv.innerHTML = `
      <button class="hover:bg-sky-300 px-4 hover:px-4 rounded " onclick="loadAllNews('${category_id}')">${category_name}</button>
      `;
    categoriesContrainer.appendChild(categoryDiv);
  }
};

const loadAllNews = async (category_id) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
  const res = await fetch(url);
  const data = await res.json();
  setAllNews(data);
};

const setAllNews = async (allNews) => {
  const { data } = allNews;
  document.getElementById("item-found").style.display = "block";
  const totalItems = data.length;
  const foundItems = document.getElementById("item-found");
  foundItems.innerHTML = `
   <h1>${totalItems} items found </h1>
  
  `;
  console.log(data);
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  data.forEach((news) => {
    const totalView = news.total_view;
    console.log(news);

    const cardDiv = document.createElement("div");
    cardDiv.classList.add("my-8");

    cardDiv.innerHTML = `
    
    <div class="card lg:card-side   bg-base-100 shadow-xl">
            
              <img src="${news.thumbnail_url}" alt="Album" />
            

            <div class="card-body">
              <h2 class="card-title">${news.title}</h2>
              <p>${news.details.slice(0, 200)}...</p>
              
             




            <div class="grid grid-cols-3">
                <div class="flex  ">
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
                <div class="flex justify-center gap-4">
                  <span class="text-2xl"> <i class="fa-solid fa-eye"></i></span>
                    <p class=" flex-initial text-2xl">${news.total_view}</p>
                </div>
                <div class="card-actions justify-end">
               

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
  //   console.log(newsId);
  const url = `https://openapi.programming-hero.com/api/news/${newsId}`;
  const res = await fetch(url);
  const data = await res.json();
  showPlyerModals(data.data);
};

const showPlyerModals = (data) => {
  data = data[0];
  console.log(data);
  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = `
  
<h2 class="text-2xl font-bold">${data.title}</h2>
<p>${data.details ? data.details : "No data available"}</p>
<div class="">
<p class="mt-4 font-semibold">Author:${
    data.author.name ? data.author.name : "No data available"
  }</p>
<p class="mt-4 font-semibold">Published Date:${
    data.author.published_date
      ? data.author.published_date
      : "No data available"
  }</p>
</div>
  
  `;
};
loadAllCategories();
