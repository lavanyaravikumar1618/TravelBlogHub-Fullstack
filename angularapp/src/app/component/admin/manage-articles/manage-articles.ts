import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-articles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-articles.html',
  styleUrls: ['./manage-articles.css']
})
export class ManageArticlesComponent {
  articles = [
    { 
      id: 1,
      title: '🏰 Backpacking Through Eastern Europe: A 30-Day Adventure', 
      author: 'Sarah Mitchell', 
      category: 'Adventure', 
      status: 'Published', 
      views: 1247, 
      likes: 89,
      comments: 23,
      image: '/assets/images/europe.jpg'
    },
    { 
      id: 2,
      title: '🏔️ Solo Trekking in the Himalayas: Finding Myself at 15,000 Feet', 
      author: 'Alex Chen', 
      category: 'Solo Travel', 
      status: 'Published', 
      views: 892, 
      likes: 67,
      comments: 15,
      image: '/assets/images/himalayas.jpg'
    },
    { 
      id: 3,
      title: '🏝️ Budget Travel in Southeast Asia: $30/Day Adventure', 
      author: 'Maria Rodriguez', 
      category: 'Budget Travel', 
      status: 'Draft', 
      views: 0, 
      likes: 0,
      comments: 0,
      image: '/assets/images/tropical.jpg'
    },
    { 
      id: 4,
      title: '🌆 48 Hours in Tokyo: A City Explorer\'s Guide', 
      author: 'David Kim', 
      category: 'City Travel', 
      status: 'Published', 
      views: 1567, 
      likes: 134,
      comments: 31,
      image: '/assets/images/city.jpg'
    }
  ];

  editArticle(article: any) {
    alert(`Editing article: ${article.title}\n\nThis would open the article editor with all the content pre-filled for editing.`);
  }

  deleteArticle(article: any) {
    if (confirm(`Are you sure you want to delete "${article.title}"?`)) {
      const index = this.articles.findIndex(a => a.id === article.id);
      if (index > -1) {
        this.articles.splice(index, 1);
        alert(`Article "${article.title}" has been deleted successfully.`);
      }
    }
  }

  toggleStatus(article: any) {
    article.status = article.status === 'Published' ? 'Draft' : 'Published';
    const action = article.status === 'Published' ? 'published' : 'unpublished';
    alert(`Article "${article.title}" has been ${action} successfully.`);
  }
}
