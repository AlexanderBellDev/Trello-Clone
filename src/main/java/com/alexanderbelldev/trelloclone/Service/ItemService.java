package com.alexanderbelldev.trelloclone.Service;

import com.alexanderbelldev.trelloclone.Model.Items;

import java.util.List;

public interface ItemService {

    public List<Items> getItems(String username);
}
