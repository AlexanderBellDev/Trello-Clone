package com.alexanderbelldev.trelloclone.Controller;

import com.alexanderbelldev.trelloclone.Model.Items;
import com.alexanderbelldev.trelloclone.Model.User;
import com.alexanderbelldev.trelloclone.Service.ItemService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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


    @PostMapping("/api/updateItem")
    @CrossOrigin("http://localhost:4200")
    public ResponseEntity<?> updateItem(@RequestBody List<Items> Item){
        for (Items item: Item) {
            if(itemService.saveItem(item).getId() == null){
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
        return new ResponseEntity<>(Item, HttpStatus.OK);
    }
}
