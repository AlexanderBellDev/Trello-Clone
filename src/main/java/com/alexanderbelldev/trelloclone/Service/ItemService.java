package com.alexanderbelldev.trelloclone.Service;

import com.alexanderbelldev.trelloclone.Model.Item;

import java.util.List;

public interface ItemService {

    List<Item> getItems(String username);

    Item saveItem(Item item);

    boolean deleteItem(Item item);

    Item getItemByID(Integer itemID);
}
