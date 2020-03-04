package com.alexanderbelldev.trelloclone.Controller;

import com.alexanderbelldev.trelloclone.Model.Item;
import com.alexanderbelldev.trelloclone.Service.ItemService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/board")
@Slf4j
@CrossOrigin(origins = {"http://localhost:4200", "https://trelloclone.cfapps.io"}, maxAge = 3600, allowCredentials = "true")
public class BoardController {

    private ItemService itemService;

    public BoardController(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping("/getItems")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getItems(Principal principal) {
        if (itemService.getItems(principal.getName()).isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok().body(itemService.getItems(principal.getName()));
    }

    @GetMapping("/getItemDetail/{itemID}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getSingleItem(@PathVariable Integer itemID) {
        return Optional
                .ofNullable(itemService.getItemByID(itemID))
                .map(item -> ResponseEntity.ok().body(item))          //200 OK
                .orElseGet(() -> ResponseEntity.notFound().build());  //404 Not found
    }


    @PostMapping("/updateItem")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> updateItem(@RequestBody List<Item> items) {
        List<Item> body = itemService.saveListOfItems(items);
        if (body.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok().body(body);
    }

    @PostMapping("/updateItemSingle")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> updateItemSingle(@RequestBody Item item) {
        return Optional
                .ofNullable(itemService.saveItem(item))
                .map(savedItem -> ResponseEntity.ok().body(savedItem))          //200 OK
                .orElseGet(() -> ResponseEntity.badRequest().build());  //404 Not found
    }

    @PostMapping("/deleteItemSingle")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> deleteItemSingle(@RequestBody Item item) {
        if (itemService.deleteItem(item)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }
}
