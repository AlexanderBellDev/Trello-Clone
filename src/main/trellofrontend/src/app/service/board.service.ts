import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Item} from "../model/item";
import {environment} from "../../environments/environment";
import {Board} from "../model/board";

@Injectable({
  providedIn: 'root'
})
export class BoardService {


  constructor(private http: HttpClient) {
  }

  getItems() {
    return this.http.get<Item[]>(`${environment.API_URL}/api/board/getItems`)
  }


  getBoardProperties() {
    return this.http.get<Board>(`${environment.API_URL}/api/board/getBoardProperties`)
  }

  submitBoardProperties(data: Board) {
    return this.http.post<Board>(`${environment.API_URL}/api/board/BoardProperties`, data)
  }

  getItemDetails(itemID) {
    return this.http.get<Item>(`${environment.API_URL}/api/board/getItemDetail/${itemID}`)
  }

  saveItems(item) {
    return this.http.post<Item[]>(`${environment.API_URL}/api/board/updateItem`, item)
  }

  saveItem(item) {
    return this.http.post<Item>(`${environment.API_URL}/api/board/updateItemSingle`, item)
  }

  deleteItem(item) {
    return this.http.post<Item>(`${environment.API_URL}/api/board/deleteItemSingle`, item)
  }

  deleteItemAction(itemToDelete) {
    this.deleteItem(itemToDelete).subscribe(() => {
        console.log('Delete successful ')
      },
      error => {
        console.log("Error", error);
      });
  }

}
