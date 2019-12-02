package com.alexanderbelldev.trelloclone.Service.Impl;

import com.alexanderbelldev.trelloclone.Model.Item;
import com.alexanderbelldev.trelloclone.Repository.ItemRepository;
import com.alexanderbelldev.trelloclone.Service.ItemService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemServiceImpl implements ItemService {
    private ItemRepository itemRepository;

    public ItemServiceImpl(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    public List<Item> getItems(String username) {
      return itemRepository.findAllByUsernameOrderByIndexNumAsc(username);
    }

    public Item saveItem(Item item) {
        return itemRepository.save(item);
    }


    public boolean deleteItem(Item item) {
         itemRepository.delete(item);
        return itemRepository.findById(item.getId()).isEmpty();
    }

    public Item getItemByID(Integer itemID) {
        return itemRepository.findById(itemID).orElse(null);
    }
}
