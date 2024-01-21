import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss'],
})
export class UserAvatarComponent {
  @Input() username: string = '';
  initials: string = '';
  backgroundColor: string = '#007bff'; // Default background color

  ngOnInit(): void {
    this.generateInitials();
    this.generateBackgroundColor();
  }

  generateInitials() {
    const nameParts = this.username.split(' ');
    this.initials =
      nameParts.length > 1
        ? nameParts[0][0] + nameParts[1][0]
        : nameParts[0][0];
  }

  generateBackgroundColor() {
    // Add logic to generate a random background color based on the username
    // Example: You can use a library like tinycolor2 to generate complementary colors
    // or use a predefined set of colors
    // For simplicity, let's use a predefined set of colors here
    const colors = [
      '#007bff', // Blue
      '#28a745', // Green
      '#dc3545', // Red
      '#ffc107', // Yellow
      '#17a2b8', // Cyan
      '#6610f2', // Purple
      '#fd7e14', // Orange
      '#6f42c1', // Violet
      '#e83e8c', // Pink
      '#20c997', // Teal
      '#00796b', // Greenish Blue
      '#9c27b0', // Deep Purple
      '#795548', // Brown
      '#2196f3', // Light Blue
      '#4caf50', // Light Green
      '#f44336', // Dark Red
      '#ff5722', // Deep Orange
      '#3f51b5', // Indigo
      '#ffeb3b', // Yellow
      '#00bcd4', // Cyan Blue
      '#ff9800', // Amber
      '#673ab7', // Deep Violet
      '#607d8b', // Blue Grey
      '#795548', // Brown
      '#ff4081', // Pink
      '#009688', // Greenish Cyan
      '#8bc34a', // Lime Green
      '#ff5252', // Light Red
      '#ff9800', // Amber
      '#4caf50', // Leaf Green
    ];
    const index = this.hashCode(this.username) % colors.length;
    this.backgroundColor = colors[index];
  }

  // A simple hash function for demo purposes
  hashCode(str: string): number {
    let hash = 0;
    if (str.length === 0) return hash;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash;
  }
}
