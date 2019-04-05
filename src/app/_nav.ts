export interface NavData {
    name?: string;
    url?: string;
    icon?: string;
    badge?: any;
    title?: boolean;
    children?: any;
    variant?: string;
    attributes?: object;
    divider?: boolean;
    class?: string;
}

export const navItems: NavData[] = [
    {
        name: 'Dashboard',
        url: '/dashboard',
        icon: 'icon-speedometer',
        badge: {
            variant: 'info',
            text: 'NEW'
        }
    },
    {
        title: true,
        name: 'Quản lý video'
    },
    {
        name: 'Videos',
        url: '/videos',
        icon: 'fa fa-film fa-lg',
        children: [
            {
                name: 'Tạo video mới',
                url: '/videos/create',
                icon: 'fa fa-plus-circle fa-lg'
            },
            {
                name: 'Lưu Tạm',
                url: '/videos/draft',
                icon: 'fa fa-folder-o fa-lg'
            },
            {
                name: 'Chờ biên tập',
                url: '/videos/editor',
                icon: 'fa fa-folder-open-o fa-lg'
            },
            {
                name: 'Chờ xuất bản',
                url: '/videos/publish',
                icon: 'fa fa-folder-open-o fa-lg'
            },
            {
                name: 'Đã xuất bản',
                url: '/videos/published',
                icon: 'icon-bell'
            },
            {
                name: 'Bị gỡ xuống',
                url: '/videos/trashed',
                icon: 'fa fa-trash-o fa-lg'
            },
        ]
    },
    {
        title: true,
        name: 'Quản lý tin'
    },
    {
        name: 'Tin bài',
        url: '/posts',
        icon: 'fa fa-newspaper-o fa-lg',
        children: [
            {
                name: 'Viết bài mới',
                url: '/posts/create',
                icon: 'fa fa-plus-circle fa-lg'
            },
            {
                name: 'Bài lưu tạm',
                url: '/posts/draft',
                icon: 'fa fa-file-text-o fa-lg'
            },
            {
                name: 'Bài chờ biên tập',
                url: '/posts/editor',
                icon: 'fa fa-file-text-o fa-lg'
            },
            {
                name: 'Bài nhận biên tập',
                url: '/posts/receiver/editor',
                icon: 'fa fa-file-text-o fa-lg'
            },
            {
                name: 'Bài chờ xuất bản',
                url: '/posts/publish',
                icon: 'fa fa-file-text-o fa-lg'
            },
            {
                name: 'Bài nhận xuất bản',
                url: '/posts/receiver/publish',
                icon: 'fa fa-file-text-o fa-lg'
            },
            {
                name: 'Bài đã xuất bản',
                url: '/posts/published',
                icon: 'fa fa-file-text-o fa-lg'
            },
        ]
    },
    {
        title: true,
        name: 'Quản lý hệ thống'
    },
    {
        name: 'Chương trình',
        url: '/manager/program',
        icon: 'fa fa-th-list fa-lg',
    },
    {
        name: 'Người dùng',
        url: '/manager/users',
        icon: 'fa fa-users fa-lg'
    },
    {
        name: 'Menu',
        url: '/manager/menu',
        icon: 'fa fa-th-list fa-lg'
    }
];
