import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Items} from "../model/items";
import {API_URL} from "../app.constants";

@Injectable({
  providedIn: 'root'
})
export class ItemService {


  constructor(private http: HttpClient) { }

  getItems(){
      return this.http.get<Items[]>(`${API_URL}/api/board/getItems`)
  }

  getItemDetails(itemID){
    return this.http.get<Items>(`${API_URL}/api/board/getItemDetail/${itemID}`)
  }
  saveItems(item){
    return this.http.post<Items[]>(`${API_URL}/api/board/updateItem`,item)
  }
  saveItem(item){
    return this.http.post<Items>(`${API_URL}/api/board/updateItemSingle`,item)
  }
  deleteItem(item){
    return this.http.post<Items>(`${API_URL}/api/board/deleteItemSingle`,item)
  }

}
