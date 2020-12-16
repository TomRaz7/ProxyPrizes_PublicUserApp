//const url = "http://192.168.0.36:4000"; //dev Bussy
const url = "http://192.168.1.45:4000"; //dev Compi

//prod without loadd balancer const url = 'http://52.47.98.136:4000';

//prod with load balancer
//const url = 'http://ProxyPrizesLb-315392771.eu-west-3.elb.amazonaws.com:4000'

export default {
  fetchShops: url + "/renderShops",
  fetchAllPosts: url + "/allPosts",
  fetchFilterPosts: url + "/filterPosts",
  fetchPostsPublishers: url + "/retrivePostsPublishers",
  fetchSingleShopPosts: url + "/retrieveSingleShopPosts",
  fetchCreateAccount: url + "/createAccount",
  fetchLogin: url + "/login",
  fetchUserDiscounts: url + "/retrieveUserDiscounts",
  fetchDiscountsShops: url + "/retrieveDiscountsShops",
  addPost: url + "/addPost",
  getS3: url + "/getS3",
  addExpoToken: url + "/addExpoToken",
  retrieveExpoToken: url + "/retrieveExpoToken",
  sendNotification: url + "/sendNotification",
  likePost: url + "/likePost",
};
