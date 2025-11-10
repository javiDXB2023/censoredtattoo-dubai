/**
 * Dashboard JavaScript
 * Interactive Dashboard for Censored Tattoo Dubai
 */

(function($) {
    'use strict';

    // =============================================
    // Data Storage (Using LocalStorage)
    // =============================================

    const DashboardData = {
        // Get appointments from localStorage
        getAppointments: function() {
            const data = localStorage.getItem('appointments');
            return data ? JSON.parse(data) : this.getSampleAppointments();
        },

        // Save appointments to localStorage
        saveAppointments: function(appointments) {
            localStorage.setItem('appointments', JSON.stringify(appointments));
        },

        // Get inquiries from localStorage
        getInquiries: function() {
            const data = localStorage.getItem('inquiries');
            return data ? JSON.parse(data) : this.getSampleInquiries();
        },

        // Save inquiries to localStorage
        saveInquiries: function(inquiries) {
            localStorage.setItem('inquiries', JSON.stringify(inquiries));
        },

        // Sample appointments data
        getSampleAppointments: function() {
            return [
                {
                    id: 1,
                    clientName: 'Ahmed Al-Mansouri',
                    email: 'ahmed.m@email.com',
                    phone: '+971 50 123 4567',
                    service: 'tattoo',
                    date: '2025-11-15',
                    time: '14:00',
                    status: 'confirmed',
                    notes: 'Dragon tattoo on upper arm'
                },
                {
                    id: 2,
                    clientName: 'Sarah Johnson',
                    email: 'sarah.j@email.com',
                    phone: '+971 55 987 6543',
                    service: 'piercing',
                    date: '2025-11-12',
                    time: '10:30',
                    status: 'pending',
                    notes: 'Nose piercing'
                },
                {
                    id: 3,
                    clientName: 'Mohammed Hassan',
                    email: 'mhhassan@email.com',
                    phone: '+971 52 456 7890',
                    service: 'laser',
                    date: '2025-11-10',
                    time: '16:00',
                    status: 'completed',
                    notes: 'Laser removal session 3 of 5'
                },
                {
                    id: 4,
                    clientName: 'Emily Roberts',
                    email: 'emily.r@email.com',
                    phone: '+971 56 234 5678',
                    service: 'tattoo',
                    date: '2025-11-18',
                    time: '11:00',
                    status: 'confirmed',
                    notes: 'Floral design on shoulder'
                },
                {
                    id: 5,
                    clientName: 'Khalid Ibrahim',
                    email: 'khalid.i@email.com',
                    phone: '+971 50 876 5432',
                    service: 'consultation',
                    date: '2025-11-11',
                    time: '09:00',
                    status: 'pending',
                    notes: 'Full sleeve consultation'
                }
            ];
        },

        // Sample inquiries data
        getSampleInquiries: function() {
            return [
                {
                    id: 1,
                    name: 'Lisa Martinez',
                    email: 'lisa.m@email.com',
                    subject: 'Pricing for Custom Tattoo',
                    message: 'Hi, I would like to know the pricing for a custom tattoo design approximately 10cm x 15cm. Also, what is the typical wait time for booking?',
                    date: '2025-11-09 14:30',
                    read: false
                },
                {
                    id: 2,
                    name: 'Omar Abdullah',
                    email: 'omar.a@email.com',
                    subject: 'Aftercare Instructions',
                    message: 'I got a tattoo from you last week. Can you send me the aftercare instructions again? I seem to have misplaced them.',
                    date: '2025-11-08 16:45',
                    read: false
                },
                {
                    id: 3,
                    name: 'Jessica Chen',
                    email: 'jchen@email.com',
                    subject: 'Cover-up Tattoo Question',
                    message: 'I have an old tattoo that I would like to cover up with a new design. Do you offer consultations for cover-up work? What should I expect?',
                    date: '2025-11-07 10:20',
                    read: true
                },
                {
                    id: 4,
                    name: 'Abdullah Saeed',
                    email: 'a.saeed@email.com',
                    subject: 'Group Booking',
                    message: 'My friends and I want to get matching tattoos. Can we book multiple appointments on the same day? We are a group of 4 people.',
                    date: '2025-11-06 12:15',
                    read: true
                }
            ];
        },

        // Get gallery items
        getGalleryItems: function() {
            return [
                { id: 1, title: 'Dragon Sleeve', category: 'tattoo', image: 'images/gallery/gallery1.jpg' },
                { id: 2, title: 'Geometric Design', category: 'tattoo', image: 'images/gallery/gallery2.jpg' },
                { id: 3, title: 'Floral Back Piece', category: 'tattoo', image: 'images/gallery/gallery3.jpg' },
                { id: 4, title: 'Portrait Tattoo', category: 'tattoo', image: 'images/gallery/gallery4.jpg' },
                { id: 5, title: 'Tribal Design', category: 'tattoo', image: 'images/gallery/gallery5.jpg' },
                { id: 6, title: 'Minimalist Art', category: 'tattoo', image: 'images/gallery/gallery6.jpg' }
            ];
        }
    };

    // =============================================
    // Dashboard Controller
    // =============================================

    const Dashboard = {
        currentSection: 'overview',
        appointments: [],
        inquiries: [],
        charts: {},

        init: function() {
            this.loadData();
            this.initNavigation();
            this.initCharts();
            this.initAppointments();
            this.initInquiries();
            this.initGallery();
            this.updateStats();
            this.updateRecentActivity();
            this.displayCurrentDate();
        },

        loadData: function() {
            this.appointments = DashboardData.getAppointments();
            this.inquiries = DashboardData.getInquiries();
        },

        displayCurrentDate: function() {
            const today = new Date();
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            $('#currentDate').text(today.toLocaleDateString('en-US', options));
        },

        // =============================================
        // Navigation
        // =============================================

        initNavigation: function() {
            const self = this;

            $('.nav-items li').on('click', function() {
                const section = $(this).data('section');
                self.switchSection(section);
            });
        },

        switchSection: function(section) {
            this.currentSection = section;

            // Update navigation
            $('.nav-items li').removeClass('active');
            $(`.nav-items li[data-section="${section}"]`).addClass('active');

            // Update content
            $('.dashboard-section').removeClass('active');
            $(`#${section}`).addClass('active');
        },

        // =============================================
        // Statistics
        // =============================================

        updateStats: function() {
            const totalAppointments = this.appointments.length;
            const unreadInquiries = this.inquiries.filter(i => !i.read).length;
            const totalClients = new Set(this.appointments.map(a => a.email)).size;
            const portfolioItems = DashboardData.getGalleryItems().length;

            // Animate numbers
            this.animateNumber('#totalAppointments', totalAppointments);
            this.animateNumber('#totalInquiries', unreadInquiries);
            this.animateNumber('#totalClients', totalClients);
            this.animateNumber('#totalPortfolio', portfolioItems);
        },

        animateNumber: function(selector, target) {
            $({ countNum: $(selector).text() }).animate({
                countNum: target
            }, {
                duration: 1000,
                easing: 'linear',
                step: function() {
                    $(selector).text(Math.floor(this.countNum));
                },
                complete: function() {
                    $(selector).text(this.countNum);
                }
            });
        },

        // =============================================
        // Charts
        // =============================================

        initCharts: function() {
            this.createAppointmentsChart();
            this.createServicesChart();
            this.createMonthlyChart();
            this.createTopServicesChart();
            this.createSourcesChart();
        },

        createAppointmentsChart: function() {
            const ctx = document.getElementById('appointmentsChart').getContext('2d');
            this.charts.appointments = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [{
                        label: 'Appointments',
                        data: [45, 52, 48, 65, 70, 68, 75, 82, 78, 85, 90, 88],
                        borderColor: '#e74c3c',
                        backgroundColor: 'rgba(231, 76, 60, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        },

        createServicesChart: function() {
            const ctx = document.getElementById('servicesChart').getContext('2d');
            this.charts.services = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Tattoo', 'Piercing', 'Laser Removal', 'Consultation', 'Modification'],
                    datasets: [{
                        data: [45, 25, 15, 10, 5],
                        backgroundColor: [
                            '#e74c3c',
                            '#3498db',
                            '#f39c12',
                            '#27ae60',
                            '#9b59b6'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
        },

        createMonthlyChart: function() {
            const ctx = document.getElementById('monthlyChart').getContext('2d');
            this.charts.monthly = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [
                        {
                            label: 'Revenue',
                            data: [12000, 15000, 13000, 18000, 20000, 19000, 22000, 25000, 23000, 26000, 28000, 27000],
                            backgroundColor: '#27ae60'
                        },
                        {
                            label: 'Appointments',
                            data: [45, 52, 48, 65, 70, 68, 75, 82, 78, 85, 90, 88],
                            backgroundColor: '#e74c3c'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        },

        createTopServicesChart: function() {
            const ctx = document.getElementById('topServicesChart').getContext('2d');
            this.charts.topServices = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Tattoo', 'Piercing', 'Laser Removal', 'Consultation', 'Modification'],
                    datasets: [{
                        label: 'Bookings',
                        data: [156, 89, 45, 34, 18],
                        backgroundColor: '#e74c3c'
                    }]
                },
                options: {
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        x: {
                            beginAtZero: true
                        }
                    }
                }
            });
        },

        createSourcesChart: function() {
            const ctx = document.getElementById('sourcesChart').getContext('2d');
            this.charts.sources = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Instagram', 'Walk-in', 'Referral', 'Website', 'Google'],
                    datasets: [{
                        data: [35, 25, 20, 15, 5],
                        backgroundColor: [
                            '#e74c3c',
                            '#3498db',
                            '#f39c12',
                            '#27ae60',
                            '#9b59b6'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
        },

        // =============================================
        // Recent Activity
        // =============================================

        updateRecentActivity: function() {
            const activities = [
                {
                    icon: 'calendar-check-o',
                    title: 'New appointment booked - Ahmed Al-Mansouri',
                    time: '2 hours ago'
                },
                {
                    icon: 'envelope',
                    title: 'New inquiry received - Lisa Martinez',
                    time: '5 hours ago'
                },
                {
                    icon: 'check-circle',
                    title: 'Appointment completed - Mohammed Hassan',
                    time: '1 day ago'
                },
                {
                    icon: 'image',
                    title: 'New portfolio image uploaded',
                    time: '2 days ago'
                },
                {
                    icon: 'star',
                    title: 'New review received - 5 stars',
                    time: '3 days ago'
                }
            ];

            const html = activities.map(activity => `
                <div class="activity-item">
                    <span class="activity-icon">
                        <i class="fa fa-${activity.icon}"></i>
                    </span>
                    <div class="activity-content">
                        <div class="activity-title">${activity.title}</div>
                        <div class="activity-time">${activity.time}</div>
                    </div>
                </div>
            `).join('');

            $('#recentActivity').html(html);
        },

        // =============================================
        // Appointments Management
        // =============================================

        initAppointments: function() {
            const self = this;

            this.renderAppointments();

            // Add appointment button
            $('#addAppointmentBtn').on('click', function() {
                self.showAppointmentModal();
            });

            // Save appointment button
            $('#saveAppointmentBtn').on('click', function() {
                self.saveAppointment();
            });

            // Filters
            $('#statusFilter, #serviceFilter').on('change', function() {
                self.filterAppointments();
            });

            $('#searchAppointments').on('keyup', function() {
                self.filterAppointments();
            });

            $('#clearFilters').on('click', function() {
                $('#statusFilter').val('all');
                $('#serviceFilter').val('all');
                $('#searchAppointments').val('');
                self.filterAppointments();
            });
        },

        renderAppointments: function(appointments) {
            const data = appointments || this.appointments;

            if (data.length === 0) {
                $('#appointmentsTableBody').html(`
                    <tr>
                        <td colspan="7" class="empty-state">
                            <i class="fa fa-calendar"></i>
                            <h3>No appointments found</h3>
                            <p>Add a new appointment to get started</p>
                        </td>
                    </tr>
                `);
                return;
            }

            const html = data.map(apt => `
                <tr>
                    <td>#${apt.id}</td>
                    <td>${apt.clientName}</td>
                    <td>${apt.email}</td>
                    <td><span class="label label-default">${apt.service}</span></td>
                    <td>${apt.date} ${apt.time}</td>
                    <td><span class="status-badge status-${apt.status}">${apt.status}</span></td>
                    <td>
                        <button class="action-btn" onclick="Dashboard.editAppointment(${apt.id})" title="Edit">
                            <i class="fa fa-edit"></i>
                        </button>
                        <button class="action-btn delete" onclick="Dashboard.deleteAppointment(${apt.id})" title="Delete">
                            <i class="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `).join('');

            $('#appointmentsTableBody').html(html);
        },

        filterAppointments: function() {
            const status = $('#statusFilter').val();
            const service = $('#serviceFilter').val();
            const search = $('#searchAppointments').val().toLowerCase();

            let filtered = this.appointments;

            if (status !== 'all') {
                filtered = filtered.filter(apt => apt.status === status);
            }

            if (service !== 'all') {
                filtered = filtered.filter(apt => apt.service === service);
            }

            if (search) {
                filtered = filtered.filter(apt =>
                    apt.clientName.toLowerCase().includes(search) ||
                    apt.email.toLowerCase().includes(search)
                );
            }

            this.renderAppointments(filtered);
        },

        showAppointmentModal: function(appointment) {
            $('#appointmentForm')[0].reset();

            if (appointment) {
                // Populate form for editing
                $('input[name="clientName"]').val(appointment.clientName);
                $('input[name="email"]').val(appointment.email);
                $('input[name="phone"]').val(appointment.phone);
                $('select[name="service"]').val(appointment.service);
                $('input[name="date"]').val(appointment.date);
                $('input[name="time"]').val(appointment.time);
                $('select[name="status"]').val(appointment.status);
                $('textarea[name="notes"]').val(appointment.notes);
                $('#appointmentModal').data('editing', appointment.id);
            } else {
                $('#appointmentModal').removeData('editing');
            }

            $('#appointmentModal').modal('show');
        },

        saveAppointment: function() {
            const form = $('#appointmentForm');
            const editingId = $('#appointmentModal').data('editing');

            const appointment = {
                clientName: $('input[name="clientName"]').val(),
                email: $('input[name="email"]').val(),
                phone: $('input[name="phone"]').val(),
                service: $('select[name="service"]').val(),
                date: $('input[name="date"]').val(),
                time: $('input[name="time"]').val(),
                status: $('select[name="status"]').val(),
                notes: $('textarea[name="notes"]').val()
            };

            if (editingId) {
                // Update existing appointment
                const index = this.appointments.findIndex(a => a.id === editingId);
                this.appointments[index] = { ...this.appointments[index], ...appointment };
            } else {
                // Add new appointment
                appointment.id = this.appointments.length > 0
                    ? Math.max(...this.appointments.map(a => a.id)) + 1
                    : 1;
                this.appointments.push(appointment);
            }

            DashboardData.saveAppointments(this.appointments);
            this.renderAppointments();
            this.updateStats();
            $('#appointmentModal').modal('hide');
        },

        editAppointment: function(id) {
            const appointment = this.appointments.find(a => a.id === id);
            if (appointment) {
                this.showAppointmentModal(appointment);
            }
        },

        deleteAppointment: function(id) {
            if (confirm('Are you sure you want to delete this appointment?')) {
                this.appointments = this.appointments.filter(a => a.id !== id);
                DashboardData.saveAppointments(this.appointments);
                this.renderAppointments();
                this.updateStats();
            }
        },

        // =============================================
        // Inquiries Management
        // =============================================

        initInquiries: function() {
            const self = this;

            this.renderInquiries();

            // Mark all as read
            $('#markAllReadBtn').on('click', function() {
                self.markAllRead();
            });

            // Delete selected
            $('#deleteSelectedBtn').on('click', function() {
                self.deleteSelected();
            });
        },

        renderInquiries: function() {
            if (this.inquiries.length === 0) {
                $('#inquiriesList').html(`
                    <div class="empty-state">
                        <i class="fa fa-envelope-open"></i>
                        <h3>No inquiries found</h3>
                        <p>All caught up!</p>
                    </div>
                `);
                return;
            }

            const html = this.inquiries.map(inquiry => `
                <div class="inquiry-item ${inquiry.read ? '' : 'unread'}" onclick="Dashboard.viewInquiry(${inquiry.id})">
                    <div class="inquiry-header">
                        <span class="inquiry-name">
                            <input type="checkbox" class="inquiry-checkbox" onclick="event.stopPropagation()" data-id="${inquiry.id}">
                            ${inquiry.name}
                        </span>
                        <span class="inquiry-time">${inquiry.date}</span>
                    </div>
                    <div class="inquiry-email">${inquiry.email}</div>
                    <div class="inquiry-subject">${inquiry.subject}</div>
                    <div class="inquiry-preview">${inquiry.message}</div>
                </div>
            `).join('');

            $('#inquiriesList').html(html);
        },

        viewInquiry: function(id) {
            const inquiry = this.inquiries.find(i => i.id === id);
            if (!inquiry) return;

            // Mark as read
            inquiry.read = true;
            DashboardData.saveInquiries(this.inquiries);
            this.updateStats();
            this.renderInquiries();

            // Show details in modal
            const html = `
                <div class="form-group">
                    <label>From:</label>
                    <p>${inquiry.name} (${inquiry.email})</p>
                </div>
                <div class="form-group">
                    <label>Date:</label>
                    <p>${inquiry.date}</p>
                </div>
                <div class="form-group">
                    <label>Subject:</label>
                    <p>${inquiry.subject}</p>
                </div>
                <div class="form-group">
                    <label>Message:</label>
                    <p>${inquiry.message}</p>
                </div>
            `;

            $('#inquiryModalBody').html(html);
            $('#inquiryModal').modal('show');
        },

        markAllRead: function() {
            this.inquiries.forEach(i => i.read = true);
            DashboardData.saveInquiries(this.inquiries);
            this.updateStats();
            this.renderInquiries();
        },

        deleteSelected: function() {
            const selected = $('.inquiry-checkbox:checked').map(function() {
                return parseInt($(this).data('id'));
            }).get();

            if (selected.length === 0) {
                alert('Please select inquiries to delete');
                return;
            }

            if (confirm(`Delete ${selected.length} selected inquiries?`)) {
                this.inquiries = this.inquiries.filter(i => !selected.includes(i.id));
                DashboardData.saveInquiries(this.inquiries);
                this.updateStats();
                this.renderInquiries();
            }
        },

        // =============================================
        // Gallery Management
        // =============================================

        initGallery: function() {
            this.renderGallery();

            $('#uploadImageBtn').on('click', function() {
                alert('Image upload functionality would be implemented here');
            });
        },

        renderGallery: function() {
            const items = DashboardData.getGalleryItems();

            const html = items.map(item => `
                <div class="gallery-item">
                    <img src="${item.image}" alt="${item.title}" onerror="this.src='images/gallery/gallery1.jpg'">
                    <div class="gallery-item-overlay">
                        <button onclick="Dashboard.editGalleryItem(${item.id})">
                            <i class="fa fa-edit"></i> Edit
                        </button>
                        <button onclick="Dashboard.deleteGalleryItem(${item.id})">
                            <i class="fa fa-trash"></i> Delete
                        </button>
                    </div>
                    <div class="gallery-item-info">
                        <div class="gallery-item-title">${item.title}</div>
                        <div class="gallery-item-category">${item.category}</div>
                    </div>
                </div>
            `).join('');

            $('#galleryGrid').html(html);
        },

        editGalleryItem: function(id) {
            alert(`Edit gallery item #${id} - This would open an edit modal`);
        },

        deleteGalleryItem: function(id) {
            if (confirm('Delete this gallery item?')) {
                alert(`Gallery item #${id} deleted`);
            }
        }
    };

    // =============================================
    // Initialize Dashboard on Document Ready
    // =============================================

    $(document).ready(function() {
        Dashboard.init();
    });

    // Make Dashboard accessible globally for inline onclick handlers
    window.Dashboard = Dashboard;

})(jQuery);
