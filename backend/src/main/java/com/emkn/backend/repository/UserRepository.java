package com.emkn.backend.repository;

import com.emkn.backend.datastore.DataStore;
import com.emkn.backend.datastore.SQLDataStore;
import com.emkn.backend.model.UserDTO;

import java.util.List;

public interface UserRepository {
    List<UserDTO> getAll();

    UserDTO getByID(int id);

    int addUser(UserDTO userDTO);

    boolean deleteByID(int id);
}


