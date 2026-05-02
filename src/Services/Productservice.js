
const BASE_URL = "https://ecomerence-backened.onrender.com";
//  const BASE_URL = "http://localhost:3000";
// const BASE_URL= "https://ecomerence-backened.onrender.com";
export const fetchurl = async (url , search="", options) => {
  try {
    const res = await fetch(`${BASE_URL}${url}?products=${search}`, options);
    if (!res) throw new Error("error in fetching data");
    if (res.ok) {
      return await res.json();
    }
    
  } catch (err) {
    console.error("fetch error", err);
  }
};
