package com.alexanderbelldev.trelloclone.Service.Impl;

import com.alexanderbelldev.trelloclone.Model.Items;
import com.alexanderbelldev.trelloclone.Repository.ItemRepository;
import com.alexanderbelldev.trelloclone.Service.ItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemServiceImpl implements ItemService {
    private ItemRepository itemRepository;

    public ItemServiceImpl(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    public List<Items> getItems(String username) {
      return itemRepository.findAllByUsernameOrderByIndexNumAsc(username);
    }

    public Items saveItem(Items item) {
        return itemRepository.save(item);
    }


    public boolean deleteItem(Items item) {
         itemRepository.delete(item);
        return itemRepository.findById(item.getId()).isEmpty();
    }

    public Items getItemByID(Integer itemID) {
        return itemRepository.findById(itemID).get();
    }
}
