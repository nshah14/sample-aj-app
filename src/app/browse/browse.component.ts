import { Component, OnInit, ViewChild } from "@angular/core";
import { Button } from "tns-core-modules/ui/button";
import { SearchBar } from "tns-core-modules/ui/search-bar";
import { EventData, fromObject } from "tns-core-modules/data/observable";
import { ListView, ItemEventData } from "tns-core-modules/ui/list-view";
import { ListPicker } from "tns-core-modules/ui/list-picker";
import { Page } from "tns-core-modules/ui/page";
// import { ItemService, Item } from "./browse.service";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { TokenModel, AutoCompleteCompletionMode, AutoCompleteDisplayMode, AutoCompleteSuggestMode } from "nativescript-ui-autocomplete";
import { VenueService, Venue } from "./browse.venue.service";
import { NativeScriptCommonModule } from "nativescript-angular/common";

@Component({
    selector: "Browse",
    templateUrl: "./browse.component.xml",
    styleUrls: ["./browse.component.css"]
})
export class BrowseComponent implements OnInit {
    public timeCounter: number = 1;
    public dateCounter: number = 1;
    public showDatePicker: boolean = false;
    public showTimePicker: boolean = false;
    public searchPhrase: string;
    public showVenuesCount: number = 1;
    public  isBeingFiltered: boolean = false;
    // items: Array<Item>;
    data = [];
    // name="venues" 
     _items: Array<Venue>;//ObservableArray<TokenModel>;
     _filteredItems: Array<Venue> ;//ObservableArray<TokenModel> = null;
    public showingLongListPicker: any = false;
    venues: Array<Venue>;
    // public venues = ["Gymfinity", "Jungle Mania", "Crazy Kids", "Mad House", "Loddon Valley Leasiure center", "Place6", "Place7","Place8", "Place9","Place10", "Place12",];

    constructor(private _venueService: VenueService) { 

        // this.initDataItems();
    }
    

    ngOnInit(): void {
        // Init your component properties here.
        console.log("initilize Browsing*******")
        this.venues = this._venueService.getVenues();
        console.log("initilize Browsing*******"+this.venues);
    
    }

  
    onTapDate(args: EventData) {
        let button = args.object as Button;
        this.dateCounter++;
        if( this.dateCounter % 2 == 0)
        {
            // alert("Tapped " + this.dateCounter + " times!");
            this.showDatePicker = true
            // alert("showDatePicker " + this.showDatePicker + " showDatePicker!");
        }
        if( this.dateCounter % 2 == 1)
        {
            // alert("Tapped " + this.dateCounter + " times!");
            this.showDatePicker = false
            // alert("showDatePicker " + this.showDatePicker + " showDatePicker!");
        }
        
        // << (hide)
    }

    onTapTime(args: EventData) {
        let button = args.object as Button;
        
        // execute your custom logic here...
        // >> (hide)
        this.timeCounter++;
        if( this.timeCounter % 2 == 0)
        {
            this.showTimePicker = true
            // alert("showTimePicker " + this.showTimePicker + " showTimePicker!");
        }
        if( this.timeCounter % 2 == 1)
        {
            this.showTimePicker = false
            // alert("showTimePicker " + this.showTimePicker + " showTimePicker!");
        }
        
    }


    /*********************SEARCH BAR code */
    

    onSubmit(args: EventData) {
        const searchBar = args.object as SearchBar;
        console.log(`Searching for ${searchBar.text}`);
    }

    onTextChanged(args) {
    
        
        const searchBar = args.object as SearchBar;
        console.log(`Input changed! New value: ${searchBar.text}`);

        if(searchBar.text === undefined)
        {
            console.log(` its undefined`);
        }
        else{
            
            const searchValue = searchBar.text.toLowerCase();
            let arrayItems=this.venues; //Set Main venues Arraylist data to Local Arraylist for Searching
            
            if (searchValue !== "") {
                this._filteredItems = new Array<Venue>();
                arrayItems.forEach( (element) => {
                    if (element.name.toLowerCase().indexOf(searchValue) !== -1) {
                        console.log(`after array item::`+element.name);
                        // this.venueList_arr.push(venue);
                        this._filteredItems.push(element);
                    }
                });
                
                this._items = this._filteredItems;
                this.dataItems;
                console.log(`now the list of items : `+this._items);
                this.isBeingFiltered = true;
            }
            console.log("SearchBar text changed! New value: " + searchBar.text);
        }
        
        
    }
    
    onClear(args) {
        const searchBar = args.object as SearchBar;
        console.log(`Clear event raised`);
        this.initDataItems();
        this.isBeingFiltered = false;
    }
    
    get dataItems(): Array<Venue> {
        // console.log(`get Data items`);
        // console.log(`item: `+this._items)
        if(!this.isBeingFiltered){
            this._items = this.venues;
        }
        
        return this._items;
    }

    private initDataItems() {
        
        console.log(`in Function initDataItems`);
        this._items = new Array<Venue>();
    
        for (let i = 0; i < this.venues.length; i++) {
            // console.log(`in Function country`+this.venues[i]);
            // console.log(`Count for I :: `+i);
            this._items.push(this.venues[i]);
        }
        console.log(`out Function initDataItems`+this._items);
    }
   showVenues(){

       this.showingLongListPicker =true;
       console.log(`show venues`);
       console.log(` being filter `+this.isBeingFiltered);
       this.showingLongListPicker =true;
    //    this.initDataItems();
       this.showVenuesCount++;
        if( this.showVenuesCount % 2 == 0)
        {
            this.showingLongListPicker = true
            // alert("showTimePicker " + this.showTimePicker + " showTimePicker!");
        }
        if( this.showVenuesCount % 2 == 1)
        {
            this.showingLongListPicker = false
            // alert("showTimePicker " + this.showTimePicker + " showTimePicker!");
        }
   }
   searchTerm:string;
   selectVenue(args){
        //    console.log(`country selected :`+ args.index)
        console.log(`Index: ${args.name}; View: ${args.view} ; Item: ${this._items[args.index].name}`);
        this.showingLongListPicker = false;
        this.searchTerm = this._items[args.index].name;       
   }

    
}
   
