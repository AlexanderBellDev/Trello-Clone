package com.alexanderbelldev.trelloclone.Service;

import com.alexanderbelldev.trelloclone.Model.Board;
import com.alexanderbelldev.trelloclone.Model.Item;

import java.util.List;

public interface BoardService {

    Board getBoardProperties(String username);

    List<Item> getItems(String username);

    Item saveItem(Item item);

    boolean deleteItem(Item item);

    Item getItemByID(Integer itemID);

    List<Item> saveListOfItems(List<Item> items);

    Board saveProperties(Board boardProperties);
}
