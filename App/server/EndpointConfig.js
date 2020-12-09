const url ='http://192.168.0.36:4000';

const loadBalancerUrl='http://192.168.0.36:5000';

//'http://192.168.1.45:4000';


export default {
  test1:url+'/test1',
  test2:url+'/test2',
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
  fetchLoadBalancer:loadBalancerUrl+'/root',
  publicAppServerTestLoadBalancer:url+'/testLoadBalancer'
}
