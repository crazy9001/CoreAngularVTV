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
                name: 'Thêm mới video',
                url: '/videos/create',
                icon: 'fa fa-upload fa-lg'
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
        name: 'Quản lý hệ thống'
    },
    {
        name: 'Chương trình',
        icon: 'fa fa-th-list fa-lg',
        children: [
            {
                name: 'Danh sách',
                url: '/manager/program',
                icon: 'fa fa-th-list fa-lg'
            },
            {
                name: 'Thêm mới',
                url: '/manager/program/create',
                icon: 'fa fa-plus fa-lg'
            },
        ]
    },
    {
        name: 'Menu',
        url: '/manager/menu',
        icon: 'fa fa-th-list fa-lg'
    }
];
