import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './explore.html',
  styleUrls: ['./explore.css']
})
export class ExploreComponent {
  articles = [
    {
      id: 1,
      title: '🏰 Backpacking Through Eastern Europe: A 30-Day Adventure',
      author: 'Sarah Mitchell',
      summary: 'From the charming streets of Prague to the stunning coastlines of Croatia, discover the hidden gems of Eastern Europe on a budget-friendly backpacking journey.',
      category: 'Europe',
      readTime: '8 min read',
      likes: 245,
      comments: [
        { id: 1, author: 'TravelLover23', text: 'Amazing article! I\'m planning a similar trip next year. Any tips for Prague?', date: '2 hours ago' },
        { id: 2, author: 'BackpackerSam', text: 'Great budget breakdown! This will definitely help with my planning.', date: '5 hours ago' }
      ]
    },
    {
      id: 2,
      title: '⛰️ Trekking the Annapurna Circuit: A Himalayan Odyssey',
      author: 'Alex Chen',
      summary: 'An epic 15-day trek through the Annapurna mountains, featuring remote villages, breathtaking peaks, and the warm hospitality of Nepal.',
      category: 'Adventure',
      readTime: '12 min read',
      likes: 189,
      comments: [
        { id: 3, author: 'MountainExplorer', text: 'Inspiring story! The Himalayas are truly magical.', date: '1 day ago' },
        { id: 4, author: 'SoloTraveler', text: 'This resonates with me so much. Solo travel is life-changing!', date: '2 days ago' }
      ]
    },
    {
      id: 3,
      title: '🏝️ Island Hopping in Southeast Asia: Paradise Found',
      author: 'Maria Rodriguez',
      summary: 'Explore the crystal-clear waters of Thailand, Indonesia, and the Philippines. A complete guide to the most beautiful islands in Southeast Asia.',
      category: 'Tropical',
      readTime: '10 min read',
      likes: 312,
      comments: [
        { id: 5, author: 'BudgetNomad', text: 'Perfect timing! I\'m heading to Thailand next month.', date: '3 hours ago' }
      ]
    },
    {
      id: 4,
      title: '🎒 Solo Travel Safety: A Complete Guide for Women',
      author: 'Emma Thompson',
      summary: 'Essential safety tips, cultural insights, and confidence-building advice for women traveling solo around the world.',
      category: 'Solo Travel',
      readTime: '6 min read',
      likes: 156,
      comments: []
    },
    {
      id: 5,
      title: '💰 Traveling on $30/Day: Budget Travel Mastery',
      author: 'Jake Wilson',
      summary: 'How to explore 20 countries on a shoestring budget. From finding cheap flights to staying in local homestays and eating like a local.',
      category: 'Budget Travel',
      readTime: '9 min read',
      likes: 278,
      comments: [
        { id: 6, author: 'RoadTripQueen', text: 'This is my dream trip! Thanks for the detailed itinerary.', date: '1 week ago' }
      ]
    },
    {
      id: 6,
      title: '🏙️ Urban Adventures: Exploring the World\'s Greatest Cities',
      author: 'David Park',
      summary: 'Navigate the bustling streets of Tokyo, the historic alleys of Istanbul, and the vibrant markets of Marrakech. City adventures like never before.',
      category: 'Urban',
      readTime: '7 min read',
      likes: 203,
      comments: [
        { id: 7, author: 'AuroraHunter', text: 'Bucket list item checked! Thanks for the tips.', date: '4 days ago' },
        { id: 8, author: 'NatureLover', text: 'Iceland is absolutely breathtaking. Great photos!', date: '1 week ago' }
      ]
    }
  ];

  selectedArticle: any = null;
  newComment = '';
  showComments = false;

  toggleComments(article: any) {
    if (this.selectedArticle?.id === article.id) {
      this.showComments = !this.showComments;
    } else {
      this.selectedArticle = article;
      this.showComments = true;
    }
  }

  addComment(article: any) {
    if (this.newComment.trim()) {
      const comment = {
        id: Date.now(),
        author: 'Current User',
        text: this.newComment.trim(),
        date: 'Just now'
      };
      article.comments.push(comment);
      this.newComment = '';
    }
  }

  likeArticle(article: any) {
    article.likes++;
  }
}
