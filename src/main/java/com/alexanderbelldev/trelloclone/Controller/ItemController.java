package com.alexanderbelldev.trelloclone.Controller;

import com.alexanderbelldev.trelloclone.Model.Items;
import com.alexanderbelldev.trelloclone.Service.ItemService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ItemController {

    private ItemService itemService;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping("/api/getItems/{username}")
    @CrossOrigin("http://localhost:4200")
    public List<Items> getItems(@PathVariable String username){
        return itemService.getItems(username);
    }
}
