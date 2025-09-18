import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-categories.html',
  styleUrls: ['./manage-categories.css']
})
export class ManageCategories {
  categories = [
    { id: 1, name: 'Technology' },
    { id: 2, name: 'Programming' }
  ];

  newCategory = { name: '' };

  addCategory() {
    if (this.newCategory.name) {
      const id = this.categories.length + 1;
      this.categories.push({ id, ...this.newCategory });
      this.newCategory = { name: '' };
    }
  }

  deleteCategory(id: number) {
    this.categories = this.categories.filter(cat => cat.id !== id);
  }
}
