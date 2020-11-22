const url ='http://192.168.1.45:4000';


export default {
  fetchShops:url+'/renderShops',
  fetchAllPosts:url+'/allPosts',
  fetchFilterPosts:url+'/filterPosts',
  fetchPostsPublishers:url+'/retrivePostsPublishers',
  fetchSingleShopPosts:url+'/retrieveSingleShopPosts',
  fetchCreateAccount:url+'/createAccount',
  fetchLogin:url+'/login',
  fetchUserDiscounts:url+'/retrieveUserDiscounts',
  fetchDiscountsShops:url+'/retrieveDiscountsShops',
  addPost: url + "/addPost",
  getS3: url + "/getS3",
}
