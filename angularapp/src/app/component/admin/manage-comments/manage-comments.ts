// src/app/component/admin/manage-comments/manage-comments.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-comments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-comments.html',
  styleUrls: ['./manage-comments.css']
})
export class ManageCommentsComponent {
  comments = [
    { 
      id: 1, 
      author: 'TravelLover23', 
      content: 'Amazing article! I\'m planning a similar trip next year. Any tips for Prague?', 
      status: 'approved',
      date: '2 hours ago',
      articleTitle: 'Backpacking Through Eastern Europe'
    },
    { 
      id: 2, 
      author: 'BackpackerSam', 
      content: 'Great budget breakdown! This will definitely help with my planning.', 
      status: 'approved',
      date: '5 hours ago',
      articleTitle: 'Backpacking Through Eastern Europe'
    },
    { 
      id: 3, 
      author: 'MountainExplorer', 
      content: 'Inspiring story! The Himalayas are truly magical.', 
      status: 'approved',
      date: '1 day ago',
      articleTitle: 'Trekking the Annapurna Circuit'
    },
    { 
      id: 4, 
      author: 'SoloTraveler', 
      content: 'This resonates with me so much. Solo travel is life-changing!', 
      status: 'pending',
      date: '2 days ago',
      articleTitle: 'Trekking the Annapurna Circuit'
    },
    { 
      id: 5, 
      author: 'BudgetNomad', 
      content: 'Perfect timing! I\'m heading to Thailand next month.', 
      status: 'approved',
      date: '3 hours ago',
      articleTitle: 'Island Hopping in Southeast Asia'
    },
    { 
      id: 6, 
      author: 'RoadTripQueen', 
      content: 'This is my dream trip! Thanks for the detailed itinerary.', 
      status: 'approved',
      date: '1 week ago',
      articleTitle: 'Traveling on $30/Day'
    },
    { 
      id: 7, 
      author: 'AuroraHunter', 
      content: 'Bucket list item checked! Thanks for the tips.', 
      status: 'flagged',
      date: '4 days ago',
      articleTitle: 'Urban Adventures'
    },
    { 
      id: 8, 
      author: 'NatureLover', 
      content: 'Iceland is absolutely breathtaking. Great photos!', 
      status: 'approved',
      date: '1 week ago',
      articleTitle: 'Urban Adventures'
    },
    { 
      id: 9, 
      author: 'SpamUser123', 
      content: 'Check out my website for cheap travel deals! Click here now!', 
      status: 'flagged',
      date: '2 hours ago',
      articleTitle: 'Backpacking Through Eastern Europe'
    },
    { 
      id: 10, 
      author: 'NewTraveler', 
      content: 'This is exactly what I needed to read. Thank you for sharing your experience!', 
      status: 'pending',
      date: '1 hour ago',
      articleTitle: 'Solo Travel Safety Guide'
    }
  ];

  filteredComments = [...this.comments];
  statusFilter = '';
  articleFilter = '';
  searchTerm = '';
  page = 1;
  limit = 5;

  get totalPages(): number {
    return Math.ceil(this.filteredComments.length / this.limit);
  }

  filterComments() {
    this.filteredComments = this.comments.filter(comment => {
      const matchesStatus = !this.statusFilter || comment.status === this.statusFilter;
      const matchesArticle = !this.articleFilter || comment.articleTitle.toLowerCase().includes(this.articleFilter.toLowerCase());
      const matchesSearch = !this.searchTerm || 
        comment.content.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        comment.author.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      return matchesStatus && matchesArticle && matchesSearch;
    });
    this.page = 1; // Reset to first page when filtering
  }

  getPendingCount(): number {
    return this.comments.filter(c => c.status === 'pending').length;
  }

  getApprovedCount(): number {
    return this.comments.filter(c => c.status === 'approved').length;
  }

  getFlaggedCount(): number {
    return this.comments.filter(c => c.status === 'flagged').length;
  }

  approve(comment: any) {
    comment.status = 'approved';
    alert(`Comment by ${comment.author} has been approved.`);
  }

  flag(comment: any) {
    comment.status = 'flagged';
    alert(`Comment by ${comment.author} has been flagged for review.`);
  }

  reply(comment: any) {
    alert(`Reply to comment by ${comment.author}:\n\nThis would open a reply dialog or redirect to the article page.`);
  }

  delete(comment: any) {
    if (confirm(`Are you sure you want to delete this comment by ${comment.author}?`)) {
      const index = this.comments.findIndex(c => c.id === comment.id);
      if (index > -1) {
        this.comments.splice(index, 1);
        this.filterComments(); // Refresh filtered list
        alert(`Comment by ${comment.author} has been deleted.`);
      }
    }
  }

  prevPage() {
    if (this.page > 1) this.page--;
  }

  nextPage() {
    if (this.page < this.totalPages) this.page++;
  }
}
