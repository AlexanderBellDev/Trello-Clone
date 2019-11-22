package com.alexanderbelldev.trelloclone.Service;

import com.alexanderbelldev.trelloclone.Model.Items;
import org.springframework.http.ResponseEntity;

import java.security.cert.Extension;
import java.util.List;

public interface ItemService {

    public List<Items> getItems(String username);

    Items saveItem(Items item);

    boolean deleteItem(Items item);

    Items getItemByID(Integer itemID);
}
