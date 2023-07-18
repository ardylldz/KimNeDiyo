package tv.codelong.thenewboston.repository
import org.springframework.data.repository.CrudRepository
import tv.codelong.thenewboston.model.News

interface NewsRepo : CrudRepository<News, Long> {


}