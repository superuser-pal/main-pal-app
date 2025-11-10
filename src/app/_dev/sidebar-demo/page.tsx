import { SidebarFigma } from '@/components/layout/sidebar-figma';

export default function SidebarDemoPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarFigma />

      {/* Main content area */}
      <main className="flex-1 p-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">
            Sidebar Demo - Pixel Perfect from Figma
          </h1>

          <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800">
              Design Specifications
            </h2>

            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <strong>Dimensions:</strong> 240px × 800px
              </p>
              <p>
                <strong>Background:</strong> rgb(250, 250, 250)
              </p>
              <p>
                <strong>Border:</strong> Right border 1px rgb(229, 229, 229)
              </p>
              <p>
                <strong>Padding:</strong> 16px
              </p>
              <p>
                <strong>Gap between sections:</strong> 6px
              </p>
            </div>

            <div className="mt-6 space-y-3">
              <h3 className="font-semibold text-gray-800">Sections:</h3>

              <div className="rounded border border-gray-200 bg-gray-50 p-3">
                <h4 className="font-medium text-gray-700">1. Logo & Search</h4>
                <p className="text-xs text-gray-600">
                  Height: 89px - Contains brand logo (59px) and search input (24px)
                </p>
              </div>

              <div className="rounded border border-gray-200 bg-gray-50 p-3">
                <h4 className="font-medium text-gray-700">2. Library Section</h4>
                <p className="text-xs text-gray-600">
                  Height: 352px - Main navigation menu items
                </p>
              </div>

              <div className="rounded border border-gray-200 bg-gray-50 p-3">
                <h4 className="font-medium text-gray-700">3. Bottom Section</h4>
                <p className="text-xs text-gray-600">
                  Height: 315px (flex-grow) - Footer menu items with Help, Settings, Logout
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="mb-2 font-semibold text-gray-800">Menu Item Specs:</h3>
              <ul className="list-inside list-disc space-y-1 text-xs text-gray-600">
                <li>Height: 32px</li>
                <li>Padding: 12px horizontal, 4px vertical</li>
                <li>Gap: 8px between icon and text</li>
                <li>Corner radius: 6px</li>
                <li>Icon size: 20px × 20px</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
