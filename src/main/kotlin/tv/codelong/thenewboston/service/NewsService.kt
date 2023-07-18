package tv.codelong.thenewboston.service

import org.springframework.stereotype.Service
import tv.codelong.thenewboston.dto.NewsDto
import tv.codelong.thenewboston.dto.toDto
import tv.codelong.thenewboston.model.News
import tv.codelong.thenewboston.repository.NewsRepo

@Service
class NewsService (
    private val newsRepo: NewsRepo
    ) {
        fun findAll() : List<NewsDto> {
            return newsRepo.findAll().map { item -> item.toDto() }
        }



        fun save(news: News): News {
            return newsRepo.save(news)
        }

        fun delete(news: News) {
            return newsRepo.delete(news)
        }
    }
