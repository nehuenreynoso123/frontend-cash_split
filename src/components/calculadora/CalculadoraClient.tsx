import { useState } from 'react';

type Calculo = 'usdt-ars' | 'costo-usdt' | 'ganancia';

export default function CalculadoraClient() {
  const [modo, setModo] = useState<Calculo>('usdt-ars');

  // USDT → ARS
  const [valorUsdt, setValorUsdt] = useState('');
  const [cantidadUsdt, setCantidadUsdt] = useState('');
  const [resultadoArs, setResultadoArs] = useState<number | null>(null);

  // Costo USDT → Ganancia ARS
  const [costoUsdt, setCostoUsdt] = useState('');
  const [valorUsdt2, setValorUsdt2] = useState('');
  const [ventaArs, setVentaArs] = useState('');
  const [gananciaArs, setGananciaArs] = useState<number | null>(null);
  const [porcentajeGanancia, setPorcentajeGanancia] = useState<number | null>(null);

  // Ganancia
  const [precioCosto, setPrecioCosto] = useState('');
  const [precioVenta, setPrecioVenta] = useState('');
  const [ganancia, setGanancia] = useState<number | null>(null);
  const [porcentaje, setPorcentaje] = useState<number | null>(null);

  const calcularUsdtAArs = () => {
    const v = parseFloat(valorUsdt);
    const c = parseFloat(cantidadUsdt);
    if (isNaN(v) || isNaN(c) || c === 0) return;
    setResultadoArs(v * c);
  };

  const calcularCostoEnUsdt = () => {
    const costo = parseFloat(costoUsdt);
    const usdt = parseFloat(valorUsdt2);
    const venta = parseFloat(ventaArs);
    if (isNaN(costo) || isNaN(usdt) || isNaN(venta) || usdt === 0) return;
    const costoEnArs = costo * usdt;
    const ganancia = venta - costoEnArs;
    setGananciaArs(ganancia);
    setPorcentajeGanancia((ganancia / costoEnArs) * 100);
  };

  const calcularGanancia = () => {
    const costo = parseFloat(precioCosto);
    const venta = parseFloat(precioVenta);
    if (isNaN(costo) || isNaN(venta) || costo === 0) return;
    const diff = venta - costo;
    setGanancia(diff);
    setPorcentaje((diff / costo) * 100);
  };

  const tabs: { key: Calculo; label: string; icon: string }[] = [
    { key: 'usdt-ars', label: 'USDT → ARS', icon: 'currency_exchange' },
    { key: 'costo-usdt', label: 'Costo USDT', icon: 'conversion_path' },
    { key: 'ganancia', label: '% Ganancia', icon: 'trending_up' },
  ];

  return (
    <div class="max-w-lg mx-auto mt-8 space-y-6">
      {/* ── Tabs ── */}
      <div class="flex gap-2 p-1.5 bg-surface-container rounded-2xl shadow-sm">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => {
              setModo(t.key);
              setResultadoArs(null);
              setGananciaArs(null);
              setPorcentajeGanancia(null);
              setGanancia(null);
              setPorcentaje(null);
            }}
            class={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-body-base font-bold transition-all duration-200 ${
              modo === t.key
                ? 'bg-secondary text-on-secondary shadow-md'
                : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
            }`}
          >
            <span class="material-symbols-outlined text-xl">{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Panel USDT → ARS ── */}
      {modo === 'usdt-ars' && (
        <div class="p-8 bg-surface rounded-2xl shadow-md">
          <div class="flex items-center gap-3 mb-6">
            <span class="material-symbols-outlined text-3xl text-secondary">currency_exchange</span>
            <h2 class="font-display-lg text-display-lg font-bold text-on-surface">USDT → ARS</h2>
          </div>

          <div class="space-y-5">
            <div>
              <label class="block font-body-base font-medium text-on-surface mb-1.5">Valor del USDT ($)</label>
              <input
                type="number"
                step="any"
                value={valorUsdt}
                onChange={(e) => setValorUsdt(e.target.value)}
                placeholder="Ej: 1300.50"
                class="w-full p-3 rounded-xl border border-outline bg-surface-container text-on-surface font-body-base placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
            <div>
              <label class="block font-body-base font-medium text-on-surface mb-1.5">Cantidad de USDT</label>
              <input
                type="number"
                step="any"
                value={cantidadUsdt}
                onChange={(e) => setCantidadUsdt(e.target.value)}
                placeholder="Ej: 100"
                class="w-full p-3 rounded-xl border border-outline bg-surface-container text-on-surface font-body-base placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
            <button
              onClick={calcularUsdtAArs}
              disabled={!valorUsdt || !cantidadUsdt}
              class="w-full py-3 px-6 rounded-xl bg-secondary text-on-secondary font-body-base font-bold hover:bg-secondary/90 transition-all duration-200 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
            >
              Calcular
            </button>
            {resultadoArs !== null && (
              <div class="mt-4 p-5 rounded-xl bg-secondary-container/30 border border-secondary-container">
                <p class="font-body-sm text-on-surface-variant mb-1">Total en pesos</p>
                <p class="font-display-lg text-display-lg font-bold text-on-surface">
                  $ {resultadoArs.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p class="font-body-sm text-on-surface-variant mt-2">
                  {valorUsdt} × {cantidadUsdt} = {resultadoArs.toFixed(2)}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Panel Costo USDT → Ganancia ARS ── */}
      {modo === 'costo-usdt' && (
        <div class="p-8 bg-surface rounded-2xl shadow-md">
          <div class="flex items-center gap-3 mb-6">
            <span class="material-symbols-outlined text-3xl text-secondary">conversion_path</span>
            <h2 class="font-display-lg text-display-lg font-bold text-on-surface">Costo USDT → Ganancia ARS</h2>
          </div>

          <div class="space-y-5">
            <div>
              <label class="block font-body-base font-medium text-on-surface mb-1.5">
                Costo del producto en USDT
              </label>
              <input
                type="number"
                step="any"
                value={costoUsdt}
                onChange={(e) => setCostoUsdt(e.target.value)}
                placeholder="Ej: 15"
                class="w-full p-3 rounded-xl border border-outline bg-surface-container text-on-surface font-body-base placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
            <div>
              <label class="block font-body-base font-medium text-on-surface mb-1.5">Valor del USDT ($)</label>
              <input
                type="number"
                step="any"
                value={valorUsdt2}
                onChange={(e) => setValorUsdt2(e.target.value)}
                placeholder="Ej: 1300.50"
                class="w-full p-3 rounded-xl border border-outline bg-surface-container text-on-surface font-body-base placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
            <div>
              <label class="block font-body-base font-medium text-on-surface mb-1.5">Precio de venta en ARS ($)</label>
              <input
                type="number"
                step="any"
                value={ventaArs}
                onChange={(e) => setVentaArs(e.target.value)}
                placeholder="Ej: 45000"
                class="w-full p-3 rounded-xl border border-outline bg-surface-container text-on-surface font-body-base placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
            <button
              onClick={calcularCostoEnUsdt}
              disabled={!costoUsdt || !valorUsdt2 || !ventaArs}
              class="w-full py-3 px-6 rounded-xl bg-secondary text-on-secondary font-body-base font-bold hover:bg-secondary/90 transition-all duration-200 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
            >
              Calcular
            </button>
            {gananciaArs !== null && porcentajeGanancia !== null && (
              <div class="mt-4 p-5 rounded-xl bg-secondary-container/30 border border-secondary-container space-y-3">
                <div>
                  <p class="font-body-sm text-on-surface-variant mb-1">Costo total en ARS</p>
                  <p class="font-body-base font-bold text-on-surface">
                    $ {(Number(costoUsdt) * Number(valorUsdt2)).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
                <div>
                  <p class="font-body-sm text-on-surface-variant mb-1">Ganancia en ARS</p>
                  <p class={`font-display-lg text-display-lg font-bold ${gananciaArs >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    $ {gananciaArs.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
                <div class="border-t border-secondary-container/50 pt-3">
                  <p class="font-body-sm text-on-surface-variant mb-1">Porcentaje de ganancia</p>
                  <p class={`font-display-lg text-display-lg font-bold ${porcentajeGanancia >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {porcentajeGanancia >= 0 ? '+' : ''}{porcentajeGanancia.toFixed(2)}%
                  </p>
                </div>
                <p class="font-body-sm text-on-surface-variant mt-2">
                  ({costoUsdt} USDT × ${Number(valorUsdt2).toLocaleString('es-AR')}) → ${Number(ventaArs).toLocaleString('es-AR')}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Panel % Ganancia ── */}
      {modo === 'ganancia' && (
        <div class="p-8 bg-surface rounded-2xl shadow-md">
          <div class="flex items-center gap-3 mb-6">
            <span class="material-symbols-outlined text-3xl text-secondary">trending_up</span>
            <h2 class="font-display-lg text-display-lg font-bold text-on-surface">Ganancia</h2>
          </div>

          <div class="space-y-5">
            <div>
              <label class="block font-body-base font-medium text-on-surface mb-1.5">Precio de costo ($)</label>
              <input
                type="number"
                step="any"
                value={precioCosto}
                onChange={(e) => setPrecioCosto(e.target.value)}
                placeholder="Ej: 25000"
                class="w-full p-3 rounded-xl border border-outline bg-surface-container text-on-surface font-body-base placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
            <div>
              <label class="block font-body-base font-medium text-on-surface mb-1.5">Precio de venta ($)</label>
              <input
                type="number"
                step="any"
                value={precioVenta}
                onChange={(e) => setPrecioVenta(e.target.value)}
                placeholder="Ej: 45000"
                class="w-full p-3 rounded-xl border border-outline bg-surface-container text-on-surface font-body-base placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
            <button
              onClick={calcularGanancia}
              disabled={!precioCosto || !precioVenta}
              class="w-full py-3 px-6 rounded-xl bg-secondary text-on-secondary font-body-base font-bold hover:bg-secondary/90 transition-all duration-200 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
            >
              Calcular
            </button>
            {ganancia !== null && porcentaje !== null && (
              <div class="mt-4 p-5 rounded-xl bg-secondary-container/30 border border-secondary-container space-y-3">
                <div>
                  <p class="font-body-sm text-on-surface-variant mb-1">Ganancia en pesos</p>
                  <p class="font-display-lg text-display-lg font-bold text-on-surface">
                    $ {ganancia.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
                <div class="border-t border-secondary-container/50 pt-3">
                  <p class="font-body-sm text-on-surface-variant mb-1">Porcentaje de ganancia</p>
                  <p class={`font-display-lg text-display-lg font-bold ${porcentaje >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {porcentaje >= 0 ? '+' : ''}{porcentaje.toFixed(2)}%
                  </p>
                </div>
                <p class="font-body-sm text-on-surface-variant mt-2">
                  ${Number(precioVenta).toLocaleString('es-AR')} — ${Number(precioCosto).toLocaleString('es-AR')} = $ {ganancia.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
