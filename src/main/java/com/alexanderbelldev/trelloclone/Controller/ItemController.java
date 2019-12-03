package com.alexanderbelldev.trelloclone.Controller;

import com.alexanderbelldev.trelloclone.Model.Item;
import com.alexanderbelldev.trelloclone.Payload.ApiResponse;
import com.alexanderbelldev.trelloclone.Service.ItemService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/board")
@Slf4j
@CrossOrigin(origins = {"http://localhost:4200","https://trelloclone.cfapps.io"}, maxAge = 3600, allowCredentials = "true")
public class ItemController {

    private ItemService itemService;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping("/getItems")
    @PreAuthorize("hasRole('USER')")

    public ResponseEntity<?> getItems(Principal principal){
        if(itemService.getItems(principal.getName()).isEmpty()){
            return new ResponseEntity<>(new ApiResponse(false, "No items found!"),
                    HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok().body(itemService.getItems(principal.getName()));
    }

    @GetMapping("/getItemDetail/{itemID}")
    @PreAuthorize("hasRole('USER')")
    public Item getSingleItem(@PathVariable Integer itemID){
        return itemService.getItemByID(itemID);
    }


    @PostMapping("/updateItem")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> updateItem(@RequestBody List<Item> Item){
        for (com.alexanderbelldev.trelloclone.Model.Item item: Item) {
            if(itemService.saveItem(item).getId() == null){
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
        return new ResponseEntity<>(Item, HttpStatus.OK);
    }
    @PostMapping("/updateItemSingle")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> updateItemSingle(@RequestBody Item item){
        System.out.println(item.toString());
            if(itemService.saveItem(item).getId() == null){
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        return new ResponseEntity<>(item, HttpStatus.OK);
    }
    @PostMapping("/deleteItemSingle")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> deleteItemSingle(@RequestBody Item item){
        System.out.println(item.toString());
       if( itemService.deleteItem(item)){
           return new ResponseEntity<>(HttpStatus.OK);
       }
       return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
