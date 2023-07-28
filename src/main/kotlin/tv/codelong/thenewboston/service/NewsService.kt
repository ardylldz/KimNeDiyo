package tv.codelong.thenewboston.service

import org.springframework.stereotype.Service
import tv.codelong.thenewboston.model.News
import tv.codelong.thenewboston.repository.NewsRepo

@Service
class NewsService (
    private val newsRepo: NewsRepo
    ) {
        fun findAll() : MutableIterable<News> {
            return newsRepo.findAll()
        }



        fun save(news: News): News {
            return newsRepo.save(news)
        }

        fun delete(news: News) {
            return newsRepo.delete(news)
        }
    fun deleteNewsById(id: Long) {
        try {
            newsRepo.deleteById(id)
            println("Haber başarıyla silindi: $id")
        } catch (e: Exception) {
            println("Haber silinirken bir hata oluştu: $id")
            e.printStackTrace()
        }
    }

}
