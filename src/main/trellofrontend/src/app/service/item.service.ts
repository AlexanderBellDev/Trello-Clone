import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Items} from "../model/items";
import {API_URL} from "../app.constants";

@Injectable({
  providedIn: 'root'
})
export class ItemService {


  constructor(private http: HttpClient) { }

  getItems(username){
      return this.http.get<Items[]>(`${API_URL}/api/getItems/${username}`)
  }

  getItemDetails(itemID){
    return this.http.get<Items>(`${API_URL}/api/getItemDetail/${itemID}`)
  }
  saveItems(item){
    return this.http.post<Items[]>(`${API_URL}/api/updateItem`,item)
  }
  saveItem(item){
    return this.http.post<Items>(`${API_URL}/api/updateItemSingle`,item)
  }
  deleteItem(item){
    return this.http.post<Items>(`${API_URL}/api/deleteItemSingle`,item)
  }

}
