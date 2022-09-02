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
      <button class="hover:bg-sky-300 hover:px-4 rounded " onclick="loadAllNews('${category_id}')">${category_name}</button>
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
  data.forEach((news) => {
    console.log(news);
  });
};
loadAllCategories();
