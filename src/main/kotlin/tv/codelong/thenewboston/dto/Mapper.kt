package tv.codelong.thenewboston.dto

import tv.codelong.thenewboston.model.Item

/**
 * This file contains all mapping extension methods for DTOs.
 * In this simple example, there is only [Item] and [ItemDto].
 */
fun Item.toDto(): ItemDto {
    return ItemDto(id, name, count, note)
}