# Кодогенерация
В данной директории находиться кодогенератор [architect-project](http://architect-project.webstap.ru/)
С его помощью можно создавать файлы по заранее заготовленным шаблонам.
Рекомендуется все компоненты/хуки создавать через него, помимо экономии времени он делает компоненты консистентными. 

## Как использовать
1. Для создания компонентов в файл `source_map/source-map-module.js` нужно дописать имя компонента и его шаблон.
Пример: 
    ```
      'src/moduleA/components': {   // путь
        TableBody: 'c',             // <имя файла>: <название или алиас шаблона> 
        TableHead: 'c',
        index: 'i',
      },
    ```
2. Запустить команду `yarn arc`.
3. Данный конфиг создаст 2 директории в `src/moduleA/components`. Получиться такая структура:
    ```
    src/moduleA/components/ ┐
                            ├─TableBody
                            │  ├─ index.ts
                            │  ├─ TableBody.settings.tsx
                            │  ├─ TableBody.tsx
                            │  ├─ TableBody.type.tsx
                            │  └─ TableBody.utils.tsx
                            ├─ TableHeader
                            │  ├─ index.ts
                            │  ├─ TableHeader.settings.tsx
                            │  ├─ TableHeader.tsx
                            │  ├─ TableHeader.type.tsx
                            │  └─ TableHeader.utils.tsx
                            └─ index.ts 
    
    ```
---

Если кодогенератор создает часть файлов которые не используются, например файл стилей для компонента. То строчку в `source-map-module.js` следует закомментировать, но не удалять.  

## Генерация API
todo: ОПИСАТЬ ПРОЦЕСС РАБОТЫ

## Генерация mock server
todo: ОПИСАТЬ ПРОЦЕСС РАБОТЫ
