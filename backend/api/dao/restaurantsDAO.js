// variable to store a reference to DB
let restaurants

export default class RestaurantsDAO {

    // method to connect to DB
    static async injectDB(conn) {
        if (restaurants) { // if already filled
            return
        }
        try {
            // fill variable with reference to DB
            restaurants = await conn.db(process.env.RESTREVIEWS_NS).collection("restaurants")

        } catch (e) {
            console.error(`Unable to establish a collection handle in restaurantsDAO: ${e}`,
            )
        }
    }

    // Get all restaurants
    static async getRestaurants({
        // options
        filters = null, // to sort 
        page = 0,
        restaurantsPerPage = 20,
    }= {}){
        let query 
        if(filters){
            // search anywhere (not necessarly equal)
            if("name" in filters){
                // set up in mongo db when we search text it seach in name field
                query = {$text:{$search: filters["name"]}}
                // search for specific cuisine passsed in filters
            }else if("cuisine" in filters){
                query = {"cuisine":{$eq:filters["cuisine"]}}  // if "cuisine" (DB) is eq(equal) the cuisine passed in  filters["cuisine"]
        }  // search for specific zipode passsed in filters
        else if ("zipcode" in filters){
            query = {"address.zipcode":{$eq:filters["zipcode"]}}
        }



    }
    let cursor
    try {
        // find all restaurants from db that matches the query
        cursor = await restaurants
        .find(query)
        
    } // if no querry : return all restaurants
     catch (e) {
         console.error(`Unable to issue find command, ${e}`)
         return {restaurantsList:[],totalNumRestaurants:0}        
    }

    // limit result





}
