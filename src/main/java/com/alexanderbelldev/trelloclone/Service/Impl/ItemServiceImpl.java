package com.alexanderbelldev.trelloclone.Service.Impl;

import com.alexanderbelldev.trelloclone.Model.Items;
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

    public List<Items> getItems(String username) {
      return itemRepository.findAllByUsernameOrderByIndexNumAsc(username);
    }
}
