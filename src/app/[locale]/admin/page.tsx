"use client";

import { useState } from 'react';
import { Container } from '@/components/container';
import { Section } from '@/components/section';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import videos from '@/content/videos.json';
import prayers from '@/content/prayers.json';
import categories from '@/content/categories.json';
import { Locale } from '@/lib/i18n';
import { getMetadata } from '@/lib/seo';

interface AdminPageProps {
  params: { locale: Locale };
}

export function generateMetadata({ params: { locale } }: AdminPageProps) {
  return getMetadata({ 
    title: locale === 'en' ? 'Admin Dashboard' : 'לוח בקרה',
    locale 
  });
}

export default function AdminPage({ params: { locale } }: AdminPageProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<Record<string, unknown> | null>(null);
  
  const t = useTranslations('admin');
  const commonT = useTranslations('common');
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  const handleAdd = () => {
    setIsAddDialogOpen(true);
  };
  
  const handleEdit = (item: Record<string, unknown>) => {
    setActiveItem(item);
    setIsAddDialogOpen(true);
  };
  
  const handleDelete = (item: Record<string, unknown>) => {
    setActiveItem(item);
    setIsDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    // In a real app, this would delete the item
    setIsDeleteDialogOpen(false);
    setActiveItem(null);
  };

  return (
    <Container className="py-12">
      <Section title={t('title')}>
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="mb-8">
            <TabsTrigger value="overview">{t('overview')}</TabsTrigger>
            <TabsTrigger value="content">{t('content')}</TabsTrigger>
            <TabsTrigger value="categories">{t('categories')}</TabsTrigger>
            <TabsTrigger value="users">{commonT('users')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6">
                <h3 className="font-medium text-lg">{locale === 'en' ? 'Total Videos' : 'סה"כ סרטונים'}</h3>
                <p className="text-3xl font-bold mt-2">{videos.length}</p>
              </Card>
              
              <Card className="p-6">
                <h3 className="font-medium text-lg">{locale === 'en' ? 'Total Prayers' : 'סה"כ תפילות'}</h3>
                <p className="text-3xl font-bold mt-2">{prayers.length}</p>
              </Card>
              
              <Card className="p-6">
                <h3 className="font-medium text-lg">{locale === 'en' ? 'Total Categories' : 'סה"כ קטגוריות'}</h3>
                <p className="text-3xl font-bold mt-2">{categories.length}</p>
              </Card>
            </div>
            
            <Card className="mt-8">
              <div className="p-6">
                <h3 className="font-medium text-lg">{locale === 'en' ? 'Recent Activity' : 'פעילות אחרונה'}</h3>
              </div>
              
              <div className="border-t">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="p-4 border-b last:border-b-0">
                    <p className="text-sm">
                      {locale === 'en' 
                        ? `User added new ${i % 2 === 0 ? 'video' : 'prayer'}`
                        : `משתמש הוסיף ${i % 2 === 0 ? 'סרטון' : 'תפילה'} חדש`}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {locale === 'en' 
                        ? `${i + 1} hour${i !== 0 ? 's' : ''} ago`
                        : `לפני ${i + 1} שעות`}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="content" className="mt-0">
            <div className="flex justify-between items-center mb-6">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('search')}
                  className="w-full rounded-md border border-input bg-background pl-9 py-2 text-sm ring-offset-background"
                />
              </div>
              
              <Button onClick={handleAdd}>
                <Plus className="h-4 w-4 mr-2" />
                {t('add')}
              </Button>
            </div>
            
            <Card>
              <div className="rounded-md border">
                <table className="w-full caption-bottom text-sm">
                  <thead>
                    <tr className="border-b transition-colors hover:bg-muted/50">
                      <th className="h-12 px-4 text-left align-middle font-medium">
                        {locale === 'en' ? 'Title' : 'כותרת'}
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium">
                        {locale === 'en' ? 'Type' : 'סוג'}
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium">
                        {locale === 'en' ? 'Category' : 'קטגוריה'}
                      </th>
                      <th className="h-12 px-4 text-right align-middle font-medium">
                        {commonT('actions')}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {videos.slice(0, 5).map((video) => {
                      const category = categories.find(cat => cat.id === video.category_id);
                      return (
                        <tr key={`video-${video.id}`} className="border-b transition-colors hover:bg-muted/50">
                          <td className="p-4 align-middle">
                            {locale === 'en' ? video.title_en : video.title_he}
                          </td>
                          <td className="p-4 align-middle">
                            {locale === 'en' ? 'Video' : 'סרטון'}
                          </td>
                          <td className="p-4 align-middle">
                            {category ? (locale === 'en' ? category.name_en : category.name_he) : ''}
                          </td>
                          <td className="p-4 align-middle text-right">
                            <Button variant="ghost" size="icon" onClick={() => handleEdit(video)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDelete(video)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                    
                    {prayers.slice(0, 5).map((prayer) => {
                      const categoryIds = prayer.category_ids || [];
                      const categoryNames = categoryIds
                        .map(id => categories.find(cat => cat.id === id))
                        .filter(Boolean)
                        .map(cat => (locale === 'en' ? cat?.name_en : cat?.name_he))
                        .join(', ');
                        
                      return (
                        <tr key={`prayer-${prayer.id}`} className="border-b transition-colors hover:bg-muted/50">
                          <td className="p-4 align-middle">
                            {locale === 'en' ? prayer.title_en : prayer.title_he}
                          </td>
                          <td className="p-4 align-middle">
                            {locale === 'en' ? 'Prayer' : 'תפילה'}
                          </td>
                          <td className="p-4 align-middle">
                            {categoryNames}
                          </td>
                          <td className="p-4 align-middle text-right">
                            <Button variant="ghost" size="icon" onClick={() => handleEdit(prayer)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDelete(prayer)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="categories" className="mt-0">
            <div className="flex justify-between items-center mb-6">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={t('search')}
                  className="w-full rounded-md border border-input bg-background pl-9 py-2 text-sm ring-offset-background"
                />
              </div>
              
              <Button onClick={handleAdd}>
                <Plus className="h-4 w-4 mr-2" />
                {t('add')}
              </Button>
            </div>
            
            <Card>
              <div className="rounded-md border">
                <table className="w-full caption-bottom text-sm">
                  <thead>
                    <tr className="border-b transition-colors hover:bg-muted/50">
                      <th className="h-12 px-4 text-left align-middle font-medium">
                        {locale === 'en' ? 'Name' : 'שם'}
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium">
                        {locale === 'en' ? 'Slug' : 'מזהה URL'}
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium">
                        {locale === 'en' ? 'Icon' : 'אייקון'}
                      </th>
                      <th className="h-12 px-4 text-right align-middle font-medium">
                        {commonT('actions')}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((category) => (
                      <tr key={category.id} className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-4 align-middle">
                          {locale === 'en' ? category.name_en : category.name_he}
                        </td>
                        <td className="p-4 align-middle">
                          {category.slug}
                        </td>
                        <td className="p-4 align-middle">
                          {category.icon}
                        </td>
                        <td className="p-4 align-middle text-right">
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(category)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(category)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="users" className="mt-0">
            <div className="flex justify-between items-center mb-6">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={t('search')}
                  className="w-full rounded-md border border-input bg-background pl-9 py-2 text-sm ring-offset-background"
                />
              </div>
              
              <Button onClick={handleAdd}>
                <Plus className="h-4 w-4 mr-2" />
                {t('add')}
              </Button>
            </div>
            
            <Card>
              <div className="rounded-md border">
                <table className="w-full caption-bottom text-sm">
                  <thead>
                    <tr className="border-b transition-colors hover:bg-muted/50">
                      <th className="h-12 px-4 text-left align-middle font-medium">
                        {locale === 'en' ? 'Name' : 'שם'}
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium">
                        {locale === 'en' ? 'Email' : 'אימייל'}
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium">
                        {locale === 'en' ? 'Role' : 'תפקיד'}
                      </th>
                      <th className="h-12 px-4 text-right align-middle font-medium">
                        {commonT('actions')}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...Array(5)].map((_, i) => (
                      <tr key={i} className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-4 align-middle">
                          {['John Doe', 'Sarah Cohen', 'Michael Levi', 'Rachel Gold', 'David Klein'][i]}
                        </td>
                        <td className="p-4 align-middle">
                          {['john@example.com', 'sarah@example.com', 'michael@example.com', 'rachel@example.com', 'david@example.com'][i]}
                        </td>
                        <td className="p-4 align-middle">
                          {i === 0 ? (locale === 'en' ? 'Admin' : 'מנהל') : (locale === 'en' ? 'Editor' : 'עורך')}
                        </td>
                        <td className="p-4 align-middle text-right">
                          <Button variant="ghost" size="icon" onClick={() => handleEdit({ id: i, name: 'User ' + i })}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete({ id: i, name: 'User ' + i })}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </Section>
      
      {/* Add/Edit Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {activeItem 
                ? locale === 'en' ? `Edit ${activeItem.title_en || activeItem.name_en || ''}` : `ערוך ${activeItem.title_he || activeItem.name_he || ''}`
                : locale === 'en' ? 'Add New Item' : 'הוסף פריט חדש'
              }
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <p className="text-center text-muted-foreground">
              {locale === 'en' 
                ? 'This is a UI mockup. Form functionality is not implemented.'
                : 'זהו מוק. פונקציונליות הטופס אינה ממומשת.'}
            </p>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              {commonT('cancel')}
            </Button>
            <Button onClick={() => setIsAddDialogOpen(false)}>
              {commonT('save')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {locale === 'en' ? 'Confirm Deletion' : 'אשר מחיקה'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <p>
              {locale === 'en' 
                ? `Are you sure you want to delete ${activeItem?.title_en || activeItem?.name_en || 'this item'}?`
                : `האם אתה בטוח שברצונך למחוק את ${activeItem?.title_he || activeItem?.name_he || 'פריט זה'}?`
              }
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {locale === 'en' 
                ? 'This action cannot be undone.'
                : 'לא ניתן לבטל פעולה זו.'}
            </p>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              {commonT('cancel')}
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              {t('delete')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Container>
  );
}
