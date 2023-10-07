<template>
    <div class="admins">
      <v-container>
        <v-row>
            <v-col cols="12">
          <!--list of admins -->
            <v-data-table
            :page                 = "page"
            :pageCount            = "numberOfPages"
            :search               = "search"
            :loading              = "loading"
            :headers              = "headers"
            :items-per-page       = "itemsPerPage"
            :server-items-length  = "totalCount"
            :options.sync         = "options"
            :items                = "admins"
            class                 = "elevation-1 dark--text justify-center font-weight-normal body-2 mt-5 snow"
          >
        <!-- Top of table -->
          <template v-slot:top>
              <v-row>
                <v-col cols="6">
                  <!-- Search Box -->
                 <form v-on:submit.prevent="searchItem">

                    <v-text-field
                      v-model             ="search"
                      placeholder         = "Search admins ..."
                      class               = "mx-4 dark--text text-body-2 px-5"
                      clearable
                      solo
                      filled
                      outlined
                      dense
                      flat
                      prepend-icon        = "refresh"
                      append-icon         = "search"
                      background-color    = "grey lighten-3"
                      color               = "dark"
                      @click:append       = "searchItem"
                      @click:prepend      ="() => readDataWithLimit(1, itemsPerPage)"
                      @click:clear        ="readDataWithLimit(1, itemsPerPage)"
            
                    >
                    </v-text-field>
                  </form>
                </v-col>
                <v-col cols="6" align="right">
                  <v-btn
                    rounded
                    depressed
                    link
                    class   = "primary"
                    :to     = "'/create-admin'"
                    large
                  >
                    <v-icon>add</v-icon>
                    Create New
                  </v-btn>
                
                </v-col>
              </v-row>
            </template>
            <!-- End of top -->
            <template v-slot:no-data>
              <v-row>
                <v-col cols="12" align="center" class="dark--text my-15">
                  <v-icon>info</v-icon> <p class="font-italic">{{ "no_data" }}</p>
                </v-col>
              </v-row>
            </template>
            <!-- slot for username -->
          
            <template v-slot:[`item.username`] = "{item}">
                <v-btn
                text
                small
                class=""
               
                >
                {{ item.username}}
                </v-btn>
            </template>
            <!-- /slot for username -->

            <!-- Slot for role -->
             <template v-slot:[`item.role`]="{ item }">
              <v-chip x-small class="primary" v-if="item.role==0" ><p class="font-italic pt-4"> {{ 'Admin' }} </p></v-chip>
              <v-chip x-small class="warning" v-else-if="item.role==1" ><p class="font-italic pt-4"> {{ 'Buyer' }} </p></v-chip>
              <v-chip x-small class="success" v-else-if="item.role==2" ><p class="font-italic pt-4"> {{ 'Seller' }} </p></v-chip>
              <v-chip x-small class="secondary" v-else><p class="font-italic pt-4"> {{ 'nothing' }} </p></v-chip>
            </template>
            <!-- /Slot for role -->

            <!-- slot for createdAt -->
            <template v-slot:[`item.createdAt`] = "{item}">
                {{ getFormattedDate(item.createdAt)}}
            </template>
            <!-- /slot for createdAt -->

            <!-- Slot for edit -->
           <template v-slot:[`item.edit`]="{ item }">
              <v-btn
                small
                icon
                link
                :href="'/admin/' + item._id"
                ><v-icon color="yellow darken-3">edit</v-icon></v-btn
              >
            </template>
            <!-- / edit Slot -->

            <!-- Slot for delete -->
           <template v-slot:[`item.delete`]="{ item }">
              <v-btn
              color="red"
                small
                icon
                @click="
                  () => {
                    toDelete = item._id;
                    dialog   = true;
                  }
                "
                ><v-icon>delete</v-icon></v-btn
              >
            </template>
            <!-- / delete Slot -->
          </v-data-table>
          <!-- delete dialogBox-->
            <v-row justify="center">
              <v-dialog
                v-model    = "dialog"
                max-width  = "300"
                persistent
              >
                <v-card>
                  <v-card-title class="title">
                  Do you want to delete?
                  </v-card-title>
                  <v-card-text>
                     This Admin is going to delete and can't be recovered.
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="green darken-1"
                      text
                      @click="dialog = false"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color  = "red darken-1"
                      @click = "deleteItem()"
                    >
                      Delete
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-row>
          <!-- /delete dialogBox-->
            </v-col>
        </v-row>
    </v-container>
    </div>
  </template>
<script>
import Admin from "../../api/admin"
export default {
  name: "Admin-List",
  data: function() {
    return {
      page: 1,
      totalCount: null,
      numberOfPages: null,
      itemsPerPage: 10,
      loading: false,
      options: {},
      search: null,
      headers: [
                {text : "Username" ,value : "username"}, 
               { text : "Email" ,value: "email"},
               { text : "Role", value : "role"},
               { text : "createdAt" ,value : "createdAt"},
               { text : "Edit", value: "edit"},
               { text : "Delete", value : "delete"},
      ],
      admins  :[],
      dialog  : false,
      toDelete : null,
      toEdit : null,
      
    }
  },
  methods: {
    getFormattedDate: function (requiredDate) {
            let date = new Date(requiredDate);
            return `${date.getDate()}/${
                date.getMonth() + 1
                }/${date.getFullYear()} - ${date.toLocaleTimeString()}`;
             },
             readDataWithLimit : async function(page,itemsPerPage){
                //table is loading 
                this.loading = true;
                let admin = new Admin();
                try {
                    var result = await admin.getTotalCount();
                    console.log("RAW Data");
                    console.log(result.data);
                    this.totalCount =result.data.data;
                    console.log("for total count data : ");
                    console.log(this.totalCount);
                    //calculate skip and limit
                    var skip = this.totalCount -itemsPerPage * page ;
                    console.log("SKIP PAGE");
                    console.log(skip);
                    var limit ;
                    if(skip < 0){
                        skip = 0;
                        limit = itemsPerPage +skip;
                        console.log(limit);
                    }else{
                        limit = itemsPerPage
                    }
                    //read data with limit
                    let range = {
                        skip : skip ,
                        limit : limit 
                    }
                     result = await admin.getWithRange(range)
                     this.admins = result.data.data;
                     this.loading = false;
                } catch (error) {
                    this.loading = false;
                    console.log("Error : ",error)
                }
             },
             searchItem:async function(){
                let admin = new Admin()
                this.loading = true;
                if(!this.search){
                  //search item is null ,reload with default
                  this.readDataWithLimit(1,this.itemsPerPage)
                }else{
                    try {
                        let result = await admin.search(this.search)
                        console.log(result.data)
                        this.admins = result.data
                        this.totalCount = result.data.length ;
                        this.loading = false;
                    } catch (error) {
                        this.loading = false;
                        console.log("Error : ",error)
                    }
                }
             },
             deleteItem : async function(){
                this.dialog = false;
                let admin = new Admin(this.toDelete)
                try {
                    await admin.deleteAdmin()
                } catch (error) {

                    console.log("Error : ",error)
                }
                this.readDataWithLimit(this.options.page, this.options.itemsPerPage);
             }

  },
  watch: {
    options: function (options) {
        this.readDataWithLimit(options.page, options.itemsPerPage);
    },
  }
}
</script>
