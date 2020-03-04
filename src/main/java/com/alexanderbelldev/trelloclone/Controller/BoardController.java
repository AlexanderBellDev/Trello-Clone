package com.alexanderbelldev.trelloclone.Controller;

import com.alexanderbelldev.trelloclone.Model.Board;
import com.alexanderbelldev.trelloclone.Model.Item;
import com.alexanderbelldev.trelloclone.Service.BoardService;
import lombok.extern.slf4j.Slf4j;
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

    private BoardService boardService;

    public BoardController(BoardService boardService) {
        this.boardService = boardService;
    }

    @GetMapping("/getItems")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getItems(Principal principal) {
        if (boardService.getItems(principal.getName()).isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok().body(boardService.getItems(principal.getName()));
    }

    @GetMapping("/getBoardProperties")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getBoardProperties(Principal principal) {
        return Optional
                .ofNullable(boardService.getBoardProperties(principal.getName()))
                .map(boardProperties -> ResponseEntity.ok().body(boardProperties)) //200 OK
                .orElseGet(() -> ResponseEntity.notFound().build());  //404 Not found
    }

    @PostMapping("/BoardProperties")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> submitBoardProperties(@RequestBody Board boardProperties, Principal principal) {
        return Optional
                .ofNullable(boardService.saveProperties(boardProperties))
                .map(savedItem -> ResponseEntity.ok().body(savedItem))          //200 OK
                .orElseGet(() -> ResponseEntity.badRequest().build());  //404 Not found
    }

    @GetMapping("/getItemDetail/{itemID}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getSingleItem(@PathVariable Integer itemID) {
        return Optional
                .ofNullable(boardService.getItemByID(itemID))
                .map(item -> ResponseEntity.ok().body(item))          //200 OK
                .orElseGet(() -> ResponseEntity.notFound().build());  //404 Not found
    }


    @PostMapping("/updateItem")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> updateItem(@RequestBody List<Item> items) {
        List<Item> body = boardService.saveListOfItems(items);
        if (body.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok().body(body);
    }

    @PostMapping("/updateItemSingle")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> updateItemSingle(@RequestBody Item item) {
        return Optional
                .ofNullable(boardService.saveItem(item))
                .map(savedItem -> ResponseEntity.ok().body(savedItem))          //200 OK
                .orElseGet(() -> ResponseEntity.badRequest().build());  //404 Not found
    }

    @PostMapping("/deleteItemSingle")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> deleteItemSingle(@RequestBody Item item) {
        if (boardService.deleteItem(item)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }
}
