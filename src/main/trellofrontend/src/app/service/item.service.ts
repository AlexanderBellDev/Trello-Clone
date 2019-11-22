import { Injectable } from '@angular/core';
import {User} from "../model/user";
import {HttpClient} from "@angular/common/http";
import {Items} from "../model/items";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  getItems(username){
      return this.http.get<Items[]>(`http://localhost:8080/api/getItems/${username}`)
  }

  getItemDetails(itemID){
    return this.http.get<Items>(`http://localhost:8080/api/getItemDetail/${itemID}`)
  }
  saveItems(item){
    return this.http.post<Items[]>(`http://localhost:8080/api/updateItem`,item)
  }
  saveItem(item){
    return this.http.post<Items>(`http://localhost:8080/api/updateItemSingle`,item)
  }
  deleteItem(item){
    return this.http.post<Items>(`http://localhost:8080/api/deleteItemSingle`,item)
  }

}
