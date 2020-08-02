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
    // items: Array<Item>;
    data = [];
    name="venues"
    private _items: ObservableArray<TokenModel>;
    private _filteredItems: ObservableArray<TokenModel>;
    public showingLongListPicker: any = false;
    public venues = ["Gymfinity", "Jungle Mania", "Crazy Kids", "Mad House", "Loddon Valley Leasiure center", "Place6", "Place7","Place8", "Place9","Place10", "Place12",];

    constructor() { 

        this.initDataItems();
    }
    

    ngOnInit(): void {
        // Init your component properties here.
        console.log("initilize Browsing*******")
    
    }

    // public onSelectedIndexChanged(args: EventData) {
    //     const picker = <ListPicker>args.object;
    //     console.log(`index: ${picker.selectedIndex}; item" ${this.venues[picker.selectedIndex]}`);
    //     this.showingLongListPicker = false;
    // }
  
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
        // alert("Tapped " + this.counter + " times!");
        
       
        // << (hide)
    }


    /*********************SEARCH BAR code */
    

    onSubmit(args: EventData) {
        const searchBar = args.object as SearchBar;
        console.log(`Searching for ${searchBar.text}`);
    }

    venueList_arr: Array<String>;
    
    // onTextChanged(args) {
    //     const searchBar = args.object as SearchBar;
    //     console.log(`Input changed! New value: ${searchBar.text}`);
    // }
  
    onTextChanged(args) {
        
        const searchBar = args.object as SearchBar;
        console.log(`Input changed! New value: ${searchBar.text}`);

        if(searchBar.text === undefined)
        {
            console.log(` its undefined`);
        }
        else{
            console.log(`in Function onTextChanged`+searchBar.text);
            const searchValue = searchBar.text.toLowerCase();
            console.log(`after lower case`+searchValue);
            let arrayItems=this.venues; //Set Main venues Arraylist data to Local Arraylist for Searching
            console.log(`after array case`+arrayItems);
            this.venueList_arr=new Array();
            if (searchValue !== "") {
                this._filteredItems = new ObservableArray<TokenModel>();
                for (let i = 0; i < arrayItems.length; i++) {
                    if (arrayItems[i].toLowerCase().indexOf(searchValue) !== -1) {
                        console.log(`after array item::`+arrayItems[i]);
                        this.venueList_arr.push(arrayItems[i]);
                        this._filteredItems.push(new TokenModel(arrayItems[i], undefined));
                    }
                }
                this._items = this._filteredItems;
            }
            console.log("SearchBar text changed! New value: " + searchBar.text);
        }
        
        
    }
    
    onClear(args) {
        const searchBar = args.object as SearchBar;
        console.log(`Clear event raised`);
        this.initDataItems();
    }
    
    get dataItems(): ObservableArray<TokenModel> {
        // console.log(`get Data items`);
        // console.log(`item: `+this._items)
        return this._items;
    }

    private initDataItems() {
        console.log(`in Function initDataItems`);
        this._items = new ObservableArray<TokenModel>();
    
        for (let i = 0; i < this.venues.length; i++) {
            console.log(`in Function country`+this.venues[i]);
            console.log(`Count for I :: `+i);
            this._items.push(new TokenModel(this.venues[i], undefined));
        }
        console.log(`out Function initDataItems`+this._items);
    }
   showVenues(){
       console.log(`show venues`);
       this.showingLongListPicker =true;
       this.initDataItems();
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
       console.log(`country selected :`+ args.index)
       console.log(`Index: ${args.index}; View: ${args.view} ; Item: ${this.venues[args.index]}`);
       this.showingLongListPicker = false;
       this.searchTerm = this.venues[args.index]; 
   }

    
}
   
