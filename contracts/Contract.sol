// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyContract {
    // Структура произвольного содержания
    struct MyStruct {
        uint256 number;
        string text;
        bool flag;
    }

    // Отображение (mapping) ключа на структуру
    mapping(bytes32 => MyStruct) public myMapping;

    // Событие при добавлении структуры в отображение
    event StructAdded(bytes32 indexed key, uint256 number, string text, bool flag);

    // Событие при удалении структуры из отображения
    event StructRemoved(bytes32 indexed key);

    // Добавление структуры в отображение
    function addStruct(bytes32 key, uint256 number, string memory text, bool flag) external {
        MyStruct memory newStruct = MyStruct(number, text, flag);
        myMapping[key] = newStruct;
        emit StructAdded(key, number, text, flag);
    }

    // Удаление структуры из отображения
    function removeStruct(bytes32 key) external {
        delete myMapping[key];
        emit StructRemoved(key);
    }
}
