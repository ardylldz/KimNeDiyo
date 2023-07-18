package tv.codelong.thenewboston.controller
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.*
import tv.codelong.thenewboston.dto.*
import tv.codelong.thenewboston.model.News
import tv.codelong.thenewboston.service.NewsService

@RestController
@RequestMapping("/api/news")
class NewsController(
    private val newsService: NewsService
) {

     @GetMapping
    fun getNews(authentication: Authentication): List<NewsDto> {
        return newsService.findAll()
     }

    @PostMapping
    fun createNews(authentication: Authentication, @RequestBody payload: CreateNewsDto) {
        val news = News(

            header = payload.header,
            content = payload.content
        )

        newsService.save(news)
    }



    /*@PutMapping("/{id}")
    fun updateNews(@PathVariable id: Long, @RequestBody payload: UpdateNewsDto) {
        val news = newsService.getNewsById(id) ?: throw ApiException(404, "News not found")

        news.header = payload.header
        news.content = payload.content

        newsService.saveNews(news)
    }

    @DeleteMapping("/{id}")
    fun deleteNews(@PathVariable id: Long) {
        val news = newsService.getNewsById(id) ?: throw ApiException(404, "News not found")
        newsService.deleteNews(news)
    }*/
}

