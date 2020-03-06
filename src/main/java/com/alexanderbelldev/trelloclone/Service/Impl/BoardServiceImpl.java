package com.alexanderbelldev.trelloclone.Service.Impl;

import com.alexanderbelldev.trelloclone.Model.Board;
import com.alexanderbelldev.trelloclone.Model.Item;
import com.alexanderbelldev.trelloclone.Repository.BoardRepository;
import com.alexanderbelldev.trelloclone.Repository.ItemRepository;
import com.alexanderbelldev.trelloclone.Service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {
    private final ItemRepository itemRepository;
    private final BoardRepository boardRepository;

    @Override
    public Board getBoardProperties(String username) {
        return boardRepository.findByUsername(username);
    }

    public List<Item> getItems(String username) {
        return itemRepository.findAllByUsernameOrderByIndexNumAsc(username);
    }

    public Item saveItem(Item item) {
        if (item.getItemColor() == null) {
            item.setItemColor("Blue");
        }
        return itemRepository.save(item);
    }


    public boolean deleteItem(Item item) {
        itemRepository.delete(item);
        return itemRepository.findById(item.getId()).isEmpty();
    }

    public Item getItemByID(Integer itemID) {
        return itemRepository.findById(itemID).orElse(null);
    }

    @Override
    public List<Item> saveListOfItems(List<Item> items) {
        return itemRepository.saveAll(items);
    }

    @Override
    public Board saveProperties(Board boardProperties) {
        return boardRepository.save(boardProperties);
    }
}
